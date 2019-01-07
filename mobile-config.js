// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.meteorapp.foodsup',
  name: 'FoodsUp!',
  description: 'A social food network',
  author: 'FoodsUp Inc.',
  email: 'admin@foodsupapp.com',
  website: 'https://foodsup.meteorapp.com'
});

// Set up resources such as icons and launch screens.
App.icons({
  "iphone": "resources/icons/iphone.icon.png", // 60x60
  "iphone_2x": "resources/icons/iphone_2x.icon.png", // 120x120
  "iphone_3x": "resources/icons/iphone_3x.icon.png", // 180x180
  "ipad": "resources/icons/ipad.icon.png", // 76x76
  "ipad_2x": "resources/icons/ipad_2x.icon.png", // 152x152
  'android_ldpi': "resources/icons/android_ldpi.icon.png", // 36x36
  'android_mdpi': "resources/icons/android_mdpi.icon.png", // 48x48
  'android_hdpi': "resources/icons/android_hdpi.icon.png", // 72x72
  'android_xhdpi': "resources/icons/android_xhdpi.icon.png" // 96x96
});

App.launchScreens({
  "iphone": "resources/splash/iphone.splash.png", // 320x245
  "iphone_2x": "resources/splash/iphone_2x.splash.png", // 640x490
  "iphone5": "resources/splash/iphone5.splash.png", // 640x1136
  "iphone6": "resources/splash/iphone6.splash.png", // 750x1334
  "iphone6p_portrait": "resources/splash/iphone6p_portrait.splash.png", // 2208x1242
  "iphone6p_landscape": "resources/splash/iphone6p_landscape.splash.png", // 2208x1242
  "ipad_portrait": "resources/splash/ipad_portrait.splash.png", // 768x1024
  "ipad_portrait_2x": "resources/splash/ipad_portrait_2x.splash.png", // 1536x2048
  "ipad_landscape": "resources/splash/ipad_landscape.splash.png", // 1024x768
  "ipad_landscape_2x": "resources/splash/ipad_landscape_2x.splash.png", // 2048x1536
  "android_ldpi_portrait": "resources/splash/android_ldpi_portrait.splash.png", // 200x320
  "android_ldpi_landscape": "resources/splash/android_ldpi_landscape.splash.png", // 320x200
  "android_mdpi_portrait": "resources/splash/android_mdpi_portrait.splash.png", // 320x480
  "android_mdpi_landscape": "resources/splash/android_mdpi_landscape.splash.png", // 480x320
  "android_hdpi_portrait": "resources/splash/android_hdpi_portrait.splash.png", // 480x800
  "android_hdpi_landscape": "resources/splash/android_hdpi_landscape.splash.png", // 800x480
  "android_xhdpi_portrait": "resources/splash/android_xhdpi_portrait.splash.png", // 720x1280
  "android_xhdpi_landscape": "resources/splash/android_xhdpi_landscape.splash.png" // 1280x720
})
App.accessRule('https://*.googleapis.com/*');
App.accessRule('https://*.google.com/*');
App.accessRule('https://*.gstatic.com/*');
// might want to limit the scope of this, also... what about Websockets?
App.accessRule('*');
App.accessRule('http://*');
App.accessRule('https://*');

App.setPreference('KeyboardDisplayRequiresUserAction','false');
App.setPreference('SuppressesIncrementalRendering','true');
// // Set PhoneGap/Cordova preferences
// App.setPreference('BackgroundColor', '0xff0000ff');
// App.setPreference('HideKeyboardFormAccessoryBar', true);
// App.setPreference('Orientation', 'default');
// App.setPreference('Orientation', 'all', 'ios');

// // Pass preferences for a particular PhoneGap/Cordova plugin
// App.configurePlugin('com.phonegap.plugins.facebookconnect', {
//   APP_ID: '1234567890',
//   API_KEY: 'supersecretapikey'
// });
