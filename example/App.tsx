import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RenderPassReport, PerformanceProfiler } from '@shopify/react-native-performance';

import { ScreenHome } from './screens/ScreenHome';
import { ScreenMeasured } from './screens/ScreenMeasured';
import { ScreenReference } from './screens/ScreenReference';

export type StackParamList = {
  Home: {
    measuredTTR: number;
    referenceTTR: number;
  };
  Measured: undefined;
  Reference: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

let measuredTTR = 0;
let referenceTTR = 0;

function setTTR(oldValue: number, newValue: number) {
  return Math.round(oldValue > 0 ? (oldValue + newValue) / 2 : newValue);
}

const App = () => {
  const navigationRef = useNavigationContainerRef<StackParamList>();

  const handlePerformanceReport = useCallback(
    (report: RenderPassReport) => {
      if (report.timeToRenderMillis) {
        switch (report.destinationScreen) {
          case 'Measured':
            measuredTTR = setTTR(measuredTTR, report.timeToRenderMillis);
            break;
          case 'Reference':
            referenceTTR = setTTR(referenceTTR, report.timeToRenderMillis);
            break;
        }
      }

      if (report.destinationScreen !== 'Home') {
        Alert.alert(`Time to render: ${Math.round(report.timeToRenderMillis || 0)} ms`, undefined, [
          {
            text: 'OK',
            onPress: () => navigationRef.navigate('Home', { measuredTTR, referenceTTR }),
          },
        ]);
      }

      console.log(JSON.stringify(report, null, 2));
    },
    [navigationRef],
  );

  return (
    <PerformanceProfiler onReportPrepared={handlePerformanceReport}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ animation: 'fade_from_bottom' }}>
          <Stack.Screen
            name="Home"
            component={ScreenHome}
            options={{ headerShown: false }}
            initialParams={{ measuredTTR, referenceTTR }}
          />
          <Stack.Screen name="Measured" component={ScreenMeasured} />
          <Stack.Screen name="Reference" component={ScreenReference} />
        </Stack.Navigator>
      </NavigationContainer>
    </PerformanceProfiler>
  );
};

export default App;
