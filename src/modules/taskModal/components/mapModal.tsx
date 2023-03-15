import MapView, {
  LatLng,
  Marker,
  MarkerDragStartEndEvent
} from 'react-native-maps'
import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useLocation } from '@hooks/useLocation'

interface Props {
  visible: boolean
  marker?: LatLng
  onClose: () => void
  handleMarker: (coord: LatLng) => void
}
export default function MapModal(props: Props) {
  const { visible, onClose, marker, handleMarker } = props
  const { currentLocation, getCurrentLocation, loading } = useLocation()

  useEffect(() => {
    if (visible) getCurrentLocation()
  }, [visible])

  useEffect(() => {
    if (currentLocation) handleMarker(currentLocation.coords)
  }, [currentLocation])

  const handleMarkerChange = (e: MarkerDragStartEndEvent) => {
    handleMarker(e.nativeEvent.coordinate)
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
              {marker && (
                <Marker
                  draggable
                  coordinate={marker}
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
