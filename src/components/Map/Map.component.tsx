import React, { useEffect, useRef, useState } from 'react'
import {
  AttributionControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import iconMarker from '@/assets/Markers/01.png'
import Logo from '@/assets/logo2Equipe.png'

type TProps = {
  center: [number, number]
  mapStyle?: React.CSSProperties
  mapClick?:
    | {
        type: 'single'
        markers: { latitude: number; longitude: number } | null
        setMarkers: React.Dispatch<
          React.SetStateAction<{ latitude: number; longitude: number } | null>
        >
        customPopup?: React.ReactNode
      }
    | {
        type: 'multiple'
        markers: { latitude: number; longitude: number }[]
        setMarkers: React.Dispatch<
          React.SetStateAction<{ latitude: number; longitude: number }[]>
        >
        customPopup?: React.ReactNode
      }
  children?: React.ReactNode
}

export default function Map({ center, children, mapStyle, mapClick }: TProps) {
  const mapRef = useRef<any>(null)
  const [prevCenter, setPrevCenter] = useState(center)
  const mapboxPrefix = '&copy; <a href="https://www.mapbox.com/">Mapbox</a> | '

  const icon = new Icon({
    iconUrl: iconMarker?.src,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  })

  // função que é chamada quando o usuário clica no mapa
  const handleMapClick = (event: any) => {
    const { lat, lng } = event.latlng
    mapClick?.type === 'single'
      ? mapClick?.setMarkers({ latitude: lat, longitude: lng })
      : mapClick?.setMarkers([
          ...mapClick.markers,
          { latitude: lat, longitude: lng },
        ])
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (mapRef.current) {
        // verifica se a posição atual é diferente da anterior
        if (prevCenter[0] !== center[0] || prevCenter[1] !== center[1]) {
          mapRef.current.setView(center)
          setPrevCenter(center) // atualiza o último valor da variável center
        }
      }
    }
  }, [center, prevCenter])

  return (
    <MapContainer
      ref={mapRef}
      center={center}
      id="map"
      zoom={17}
      zoomControl={true}
      style={mapStyle}
    >
      <TileLayer
        attribution={`${mapboxPrefix}Imagery &copy; ${new Date().getFullYear()} Mapbox`}
        url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
      />

      {/* renderiza um ponto */}
      {mapClick?.type === 'single' && mapClick?.markers?.latitude ? (
        <Marker
          position={[mapClick.markers.latitude, mapClick.markers.longitude]}
          icon={icon}
        >
          {mapClick?.customPopup ? (
            <Popup>{mapClick?.customPopup}</Popup>
          ) : null}
        </Marker>
      ) : null}

      {/* renderiza vários pontos */}
      {mapClick?.type === 'multiple' &&
      mapClick?.markers &&
      mapClick?.markers.length > 0
        ? mapClick?.markers.map((marker, index) => (
            <Marker
              key={index}
              position={[marker.latitude, marker.longitude]}
              icon={icon}
            >
              {mapClick?.customPopup ? (
                <Popup>{mapClick?.customPopup}</Popup>
              ) : null}
            </Marker>
          ))
        : null}

      {/* Evento de click no mapa do leaflet */}
      {mapClick && <MapEventsWrapper onMapClick={handleMapClick} />}

      {/* Renderiza os demais markers */}
      {children ? children : null}
    </MapContainer>
  )
}

function MapEventsWrapper({ onMapClick }: { onMapClick: any }) {
  useMapEvents({
    click: (event) => {
      onMapClick(event)
    },
  })
  return null
}
