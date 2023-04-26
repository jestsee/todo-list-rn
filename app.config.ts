/* eslint-disable sort-keys */
import 'dotenv/config'

export default {
  expo: {
    name: 'todo_list_rn',
    slug: 'todo_list_rn',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/react.png',
    userInterfaceStyle: 'light',
    scheme: 'io.supabase.todolist',
    splash: {
      image: './assets/react-splash.png',
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
        foregroundImage: './assets/react.png',

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
      ],
      package: 'com.todolist.reactnative',
      buildNumber: '1.0.0'
    },
    web: {
      favicon: './assets/react.png'
    },
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseSecret: process.env.SUPABASE_SECRET,
      redirectLink: process.env.REDIRECT_LINK,
      eas: {
        projectId: '965da3d7-4bd2-48de-a1dd-5925b0c6e2dd'
      }
    },
    plugins: [
      [
        'expo-location',
        {
          isAndroidBackgroundLocationEnabled:
            'Allow Todo List to use your location.'
        }
      ],
      [
        'expo-image-picker',
        {
          photosPermission:
            'The app accesses your photos to let you share them with your friends.'
        }
      ],
      [
        'expo-contacts',
        {
          contactsPermission: 'Allow Todo List to access your contacts.'
        }
      ]
    ]
  }
}
