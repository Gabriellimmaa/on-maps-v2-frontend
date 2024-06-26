import { TCampus } from '@/types'
import React, { createContext, useContext, useState } from 'react'

type MapInfoContextType = {
  viewMenu: boolean
  setViewMenu: (value: boolean) => void
  config: string
  setConfig: (value: string | undefined) => void
  position: {
    latitude: number
    longitude: number
  }
  setPosition: (value: { latitude: number; longitude: number }) => void
  zoomIcon: number
  setScale: (value: number) => void
  anchorIcon: number
  setAnchor: (value: number) => void
  popAnchor: number
  setPopAnchor: (value: number) => void
  universityId: number | null
  setUniversityId: (value: any) => void
  campusId: number | null
  setCampusId: (value: any) => void
}

const MapInfoContext = createContext<MapInfoContextType>({
  viewMenu: false,
  setViewMenu: () => {},
  config: '',
  setConfig: () => {},
  position: {
    latitude: 0,
    longitude: 0,
  },
  setPosition: () => {},
  zoomIcon: 48,
  setScale: () => {},
  anchorIcon: 23,
  setAnchor: () => {},
  popAnchor: -60,
  setPopAnchor: () => {},
  universityId: null,
  setUniversityId: () => {},
  campusId: null,
  setCampusId: () => {},
})

const MapInfoProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [viewMenu, setViewMenu] = useState(false)
  const [config, setConfig] = useState('')
  const [position, setPosition] = useState<{
    latitude: number
    longitude: number
  }>({
    latitude: 0,
    longitude: 0,
  })
  const [zoomIcon, setScale] = useState(48)
  const [anchorIcon, setAnchor] = useState(23)
  const [popAnchor, setPopAnchor] = useState(-60)
  const [universityId, setUniversityId] = useState(null)
  const [campusId, setCampusId] = useState(null)

  return (
    <MapInfoContext.Provider
      value={{
        viewMenu,
        setViewMenu,
        config,
        setConfig,
        position,
        setPosition,
        zoomIcon,
        setScale,
        anchorIcon,
        setAnchor,
        popAnchor,
        setPopAnchor,
        universityId,
        setUniversityId,
        campusId,
        setCampusId,
      }}
    >
      {children}
    </MapInfoContext.Provider>
  )
}

function useMapInfo(): MapInfoContextType {
  const context = useContext(MapInfoContext)

  if (!context) {
    throw new Error('useMapInfo must be used within a MapInfoProvider')
  }

  return context
}

export { MapInfoProvider, useMapInfo }
