import MapView, {
  LatLng,
  Marker,
  MarkerDragStartEndEvent
} from 'react-native-maps'
import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocation } from '@hooks/useLocation'

interface Props {
  visible: boolean
  onClose: () => void
}
export default function MapModal({ visible, onClose }: Props) {
  const { currentLocation, getCurrentLocation, loading } = useLocation()
  const [markerCoords, setMarkerCoords] = useState<LatLng>()

  useEffect(() => {
    if (visible) getCurrentLocation()
  }, [visible])

  useEffect(() => {
    if (currentLocation) setMarkerCoords(currentLocation.coords)
  }, [currentLocation])

  const handleMarkerChange = (e: MarkerDragStartEndEvent) => {
    const {
      nativeEvent: { coordinate }
    } = e
    console.log('coord', coordinate)
    setMarkerCoords(e.nativeEvent.coordinate)
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <>
          {loading ? (
            <Text style={{ flex: 1 }}>Loading</Text>
          ) : (
            <MapView
              style={styles.map}
              onPress={handleMarkerChange}
              initialRegion={{
                ...(currentLocation?.coords ?? {
                  latitude: 37.78825,
                  longitude: -122.4324
                }),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            >
              {markerCoords && (
                <Marker
                  draggable
                  coordinate={markerCoords}
                  onDragEnd={handleMarkerChange}
                />
              )}
            </MapView>
          )}
          <Text style={styles.closeButton} onPress={onClose}>
            Close
          </Text>
          {/* TODO cancel & reset button */}
        </>
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
    flex: 1
  },
  map: {
    flex: 1,
    height: '100%',
    width: '100%'
  }
})
