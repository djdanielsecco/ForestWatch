import React from 'react'
import { View, Text } from 'react-native'
import Reader from "../components/reader";
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function Scanner() {
  return (
    <SafeAreaProvider>
      <Reader />
    </SafeAreaProvider>
  )
}
