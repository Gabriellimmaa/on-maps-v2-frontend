'use-client'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import { LoadingSpinner, MapHeader, MapSearch, MapSideBar } from '@/components'
import { useMapInfo } from '@/context/_useMapInfo.context'
import 'leaflet/dist/leaflet.css'
import { useQuery } from '@tanstack/react-query'
import { getPlaceFilter } from '@/api'

const MapComponent = dynamic(() => import('@/components/Map/Map.component'), {
  loading: () => <p>loading...</p>,
  ssr: false,
})

const MarkerComponent = dynamic(
  () => import('@/components/Map/Marker.component'),
  {
    loading: () => <p>loading...</p>,
    ssr: false,
  }
)

export default function Map() {
  const router = useRouter()
  const { params } = router.query
  const {
    position,
    setPosition,
    zoomIcon,
    anchorIcon,
    popAnchor,
    setUniversityId,
    setCampusId,
    campusId,
  } = useMapInfo()

  useEffect(() => {
    if (params) {
      const [universityId, campusId, latitude, longitude] = params as string[]

      if (
        isNaN(Number(latitude)) ||
        isNaN(Number(longitude)) ||
        isNaN(Number(universityId)) ||
        isNaN(Number(campusId))
      ) {
        router.push('/404')
      } else {
        setUniversityId(Number(universityId))
        setCampusId(Number(campusId))
        setPosition({
          latitude: Number(latitude),
          longitude: Number(longitude),
        })
      }
    }
  }, [params])

  const { data: places, isLoading: isLoadingPlaces } = useQuery(
    ['places', params],
    () =>
      getPlaceFilter({
        campusId: campusId,
      }),
    {
      enabled: !!campusId,
    }
  )

  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <MapSearch />
      <MapHeader />
      <MapSideBar />
      {isLoadingPlaces ? (
        <LoadingSpinner />
      ) : (
        <MapComponent
          center={[position.latitude, position.longitude]}
          mapStyle={{
            minHeight: '100vh',
            minWidth: '100vw',
            position: 'fixed',
            top: 0,
          }}
        >
          {places?.map((place) => (
            <MarkerComponent
              key={place.id}
              zoomIcon={zoomIcon}
              anchorIcon={anchorIcon}
              popAnchor={popAnchor}
              place={place}
            />
          ))}
        </MapComponent>
      )}
    </div>
  )
}

Map.ssr = false
Map.displayName = 'Map'
