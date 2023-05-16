import React, { useState } from 'react'
import styles from './styles/MapSearch.module.css'
import { MapCardSearch } from './_MapCardSearch.component'
import { AiOutlineMenu } from 'react-icons/ai'
import { BsFillGridFill } from 'react-icons/bs'
import { TbListDetails } from 'react-icons/tb'
import { useMapInfo } from '@/pages/map/context/_useMapInfo.context'

const rooms = [
  {
    id: 1,
    name: 'Sala 1',
    description: 'Sala de aula',
    piso: 1,
    category: 'sala',
    link: 'https://cdn.discordapp.com/attachments/771470980324524043/1001706440601370766/preview1.png',
    latitude: -23.108,
    longitude: -50.3594239,
  },
  {
    id: 2,
    name: 'Sala 2',
    description: 'Sala de aula',
    piso: 1,
    category: 'sala',
    link: 'https://cdn.discordapp.com/attachments/771470980324524043/1074461555904745524/f53137d8-2472-434b-8ab0-385a611f0c8d.JPG',
    latitude: -23.108,
    longitude: -50.3594239,
  },
  {
    id: 3,
    name: 'Sala 3',
    description: 'Sala de aula',
    piso: 2,
    category: 'sala',
    link: 'https://cdn.discordapp.com/attachments/1087523573289189476/1087888499216224397/image.png',
    latitude: -23.108,
    longitude: -50.3594239,
  },
]

export function MapSearch() {
  const { viewMenu, setViewMenu } = useMapInfo()
  const [search, setSearch] = useState('')
  const [typeCard, setTypeCard] = useState<'grid' | 'list'>('list')

  return (
    <div
      className={
        viewMenu ? styles.topnavmap : `${styles.topnavmap} ${styles.active}`
      }
    >
      <div
        className={
          rooms.length > 0
            ? `${styles.search} ${styles.activecard}`
            : styles.search
        }
        id="toggle"
      >
        <AiOutlineMenu
          className={styles.icon}
          onClick={() => {
            setViewMenu(!viewMenu)
          }}
        />
        <input
          className={styles.input}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquise por um local"
          id="input-text"
          type="text"
        />
        {typeCard === 'list' ? (
          <BsFillGridFill
            className={styles.icon_config}
            onClick={() => setTypeCard('grid')}
          />
        ) : (
          <TbListDetails
            className={styles.icon_config}
            onClick={() => setTypeCard('list')}
          />
        )}
      </div>
      <div
        id="card"
        style={{
          marginLeft: 10,
          width: 'calc(100% + 2px)',
        }}
      >
        {rooms.map((room) => {
          return <MapCardSearch type={typeCard} room={room} key={room.id} />
        })}
      </div>
    </div>
  )
}
