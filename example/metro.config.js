const path = require('path');
const pak = require('../package.json');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const root = path.resolve(__dirname, '..');
const defaultConfig = getDefaultConfig(__dirname);

const modules = Object.keys({
  ...pak.peerDependencies,
});

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  projectRoot: __dirname,
  watchFolders: [root],

  // Keep peer dependencies on the example's versions and resolve the library from its source.
  resolver: {
    blockList: [
      defaultConfig.resolver.blockList,
      ...modules.map((name) => {
        const modulePath = path.join(root, 'node_modules', name);
        const escapedPath = modulePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp(`^${escapedPath}\\/.*$`);
      }),
    ],

    extraNodeModules: modules.reduce(
      (acc, name) => {
        acc[name] = path.join(__dirname, 'node_modules', name);
        return acc;
      },
      { [pak.name]: root },
    ),
  },
};

module.exports = mergeConfig(defaultConfig, config);
