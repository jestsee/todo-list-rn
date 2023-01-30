import { Home } from './home'
import React from 'react'
import { RootStackParamList } from '@custom-types/route'
import { baseStyles } from '@constants/styles'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator<RootStackParamList>()

const StackWrapper: React.FC<{ children: React.ReactNode }> = ({
  children
}) => (
  <Stack.Navigator
    screenOptions={{
      contentStyle: baseStyles.contentStyle,
      headerShown: false
    }}
  >
    {children}
  </Stack.Navigator>
)

export const HomeScreen = () => (
  <StackWrapper>
    <Stack.Screen name="Home" component={Home} />
  </StackWrapper>
)
