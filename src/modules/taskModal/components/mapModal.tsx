import { Modal, StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-maps'
import React from 'react'

interface Props {
  visible: boolean
  onClose: () => void
}
export default function MapDialog({ visible, onClose }: Props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
        <Text style={styles.closeButton} onPress={onClose}>
          Close
        </Text>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'flex-end'
  },
  map: {
    height: 300,
    width: '100%'
  }
})
