cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    },
    {
        "id": "cordova-plugin-network-information.network",
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "id": "cordova-plugin-network-information.Connection",
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "id": "cordova-plugin-progress.Progress",
        "file": "plugins/cordova-plugin-progress/www/progress.js",
        "pluginId": "cordova-plugin-progress",
        "clobbers": [
            "progress"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "cordova-plugin-x-socialsharing.SocialSharing",
        "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
        "pluginId": "cordova-plugin-x-socialsharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    },
    {
        "id": "it.mobimentum.phonegapspinnerplugin.SpinnerPlugin",
        "file": "plugins/it.mobimentum.phonegapspinnerplugin/www/spinnerplugin.js",
        "pluginId": "it.mobimentum.phonegapspinnerplugin",
        "clobbers": [
            "window.spinnerplugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-device": "1.1.4",
    "cordova-plugin-inappbrowser": "1.6.2-dev",
    "cordova-plugin-network-information": "1.3.1",
    "cordova-plugin-progress": "0.3.0",
    "cordova-plugin-splashscreen": "4.0.0",
    "cordova-plugin-whitelist": "1.3.0",
    "cordova-plugin-x-socialsharing": "5.1.3",
    "it.mobimentum.phonegapspinnerplugin": "1.2.1"
};
// BOTTOM OF METADATA
});