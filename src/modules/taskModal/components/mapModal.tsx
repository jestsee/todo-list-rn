import MapView, {
  Address,
  LatLng,
  Marker,
  MarkerDragStartEndEvent
} from 'react-native-maps'
import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@components'
import { addressToString } from 'src/utils'
import { useLocation } from '@hooks/useLocation'

interface Props {
  visible: boolean
  marker?: LatLng
  onClose: () => void
  handleMarker: (coord?: LatLng) => void
}
export default function MapModal(props: Props) {
  const { visible, onClose, marker, handleMarker } = props
  const { initialLocation, getInitialLocation, loading } = useLocation()
  const [address, setAddress] = useState<Address>()
  const mapRef = useRef<MapView>(null)

  useEffect(() => {
    getInitialLocation()
  }, [])

  useEffect(() => {
    updateAddress()
  }, [marker])

  const updateAddress = async () => {
    if (!marker) {
      setAddress(undefined)
      return
    }
    const newAddress = await mapRef.current?.addressForCoordinate(marker)
    setAddress(newAddress)
  }

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
          <MapView
            ref={mapRef}
            style={styles.map}
            onPress={handleMarkerChange}
            onPoiClick={handleMarkerChange}
            loadingEnabled={loading}
            initialRegion={{
              ...(initialLocation?.coords ?? {
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
          <View style={{ backgroundColor: 'white', padding: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>
              Selected Location
            </Text>
            <Text style={{ marginBottom: 16 }}>
              {address
                ? addressToString(address)
                : 'Please choose a location first'}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Button
                title="Clear"
                onPress={() => handleMarker(undefined)}
                style={{ flex: 1 }}
              />
              <View style={{ width: 16 }} />
              <Button title="Save" onPress={onClose} style={{ flex: 1 }} />
            </View>
          </View>
        </>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
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
