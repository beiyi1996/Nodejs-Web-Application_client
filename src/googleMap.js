import React, { useState, useEffect, useRef } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'
import Skeleton from '@material-ui/lab/Skeleton'
import MarkerIcon from './images/marker.png'

const googleMapsAPIKey = {
  key: 'AIzaSyDsfL7MkWt_Sh0i-UF_giYeOpXGPbM3Ews',
}

const GoogleMaps = ({ mapProps }) => {
  const [visible, setVisible] = useState(false)
  const [showingInfoWindow, setShowingInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState({})
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  })

  function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }

  const prevCount = usePrevious(mapProps)

  useEffect(() => {
    if (mapProps !== prevCount) {
      const geocoder = new window.google.maps.Geocoder()
      if (mapProps.address !== '') {
        setVisible(false)

        geocoder.geocode(
          {
            address: mapProps.address,
          },
          (results, status) => {
            if (status === 'OK') {
              setCurrentLocation({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() })
            } else {
              alert('Geocode was not successful for the following reason: ' + status)
            }
          }
        )
        setVisible(true)
      }
    }
  }, [mapProps, prevCount])

  const onMarkerClick = (marker, e) => {
    setActiveMarker(marker)
    setShowingInfoWindow(true)
  }

  const onClose = (props) => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false)
      setActiveMarker(null)
    }
  }

  return currentLocation.lat !== 0 && currentLocation.lng !== 0 ? (
    <Map google={window.google} zoom={14} visible={visible} initialCenter={currentLocation}>
      <Marker
        onClick={onMarkerClick}
        icon={{
          url: MarkerIcon,
        }}
        position={currentLocation}
      />
      <InfoWindow marker={activeMarker} visible={showingInfoWindow} onClose={onClose}>
        <div>
          <h4>{mapProps.name}</h4>
        </div>
      </InfoWindow>
    </Map>
  ) : (
    <Skeleton variant="rect" width={'100%'} height={'100%'} />
  )
}

export default GoogleApiWrapper({
  apiKey: googleMapsAPIKey.key,
})(GoogleMaps)
