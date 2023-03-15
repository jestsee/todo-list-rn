/* eslint-disable sort-keys */
import 'dotenv/config'

export default {
  expo: {
    name: 'todo_list_rn',
    slug: 'todo_list_rn',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    scheme: 'io.supabase.todolist',
    splash: {
      image: './assets/splash.png',

      resizeMode: 'contain',

      backgroundColor: '#ffffff'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',

        backgroundColor: '#FFFFFF'
      },
      config: {
        googleMaps: {
          apiKey: 'AIzaSyD3WgQy_SlkDEBx9jliZVyli0FazV03ciY'
        }
      },
      intentFilters: [
        {
          action: 'VIEW',
          autoVerify: true,
          data: [
            {
              scheme: 'io.supabase.todolist',
              host: 'login-callback',
              pathPrefix: '/'
            }
          ],
          category: ['BROWSABLE', 'DEFAULT']
        }
      ]
    },
    web: {
      favicon: './assets/favicon.png'
    },
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseSecret: process.env.SUPABASE_SECRET,
      redirectLink: process.env.REDIRECT_LINK
    },
    plugins: [
      [
        'expo-location',
        {
          isAndroidBackgroundLocationEnabled:
            'Allow Todo List to use your location.'
        }
      ]
    ]
  }
}
