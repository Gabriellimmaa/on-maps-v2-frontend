import React, { useEffect, useState } from 'react'
import styles from './styles/MapSearch.module.css'
import { MapCardSearch } from './_MapCardSearch.component'
import { AiOutlineMenu } from 'react-icons/ai'
import { BsFillGridFill } from 'react-icons/bs'
import { TbListDetails } from 'react-icons/tb'
import { useMapInfo } from '@/context/_useMapInfo.context'
import { useDebounce } from '@/hooks'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/Form'
import { TGetPlaceFilterQueryParams } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { getPlaceFilter } from '@/api'
import { queryClient } from '@/clients'

export function MapSearch() {
  const { viewMenu, setViewMenu } = useMapInfo()
  const [name, setName] = useState('')
  const [typeCard, setTypeCard] = useState<'grid' | 'list'>('list')
  const [params, setParams] = useState<TGetPlaceFilterQueryParams>({})

  const formHandler = useForm<any>({
    shouldUnregister: false,
  })

  const debouncedSearch = useDebounce(name, 500)

  const {
    data: places,
    isFetching: isLoadingPlaces,
    isInitialLoading,
  } = useQuery(['places', params], () => getPlaceFilter(params), {
    enabled: !!debouncedSearch,
    keepPreviousData: true,
  })

  useEffect(() => {
    if (!!debouncedSearch) {
      setParams({
        placeName: debouncedSearch,
      })
      return
    }

    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  return (
    <div
      className={
        viewMenu ? styles.topnavmap : `${styles.topnavmap} ${styles.active}`
      }
    >
      <div
        className={
          !places
            ? styles.search
            : places?.length > 0
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
          onChange={(e) => setName(e.target.value)}
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
          width: '100%',
          maxHeight: 'calc(100vh - 100px)',
          overflowY: 'auto',
        }}
      >
        {debouncedSearch !== '' &&
          places?.map((place) => {
            return (
              <MapCardSearch type={typeCard} place={place} key={place.id} />
            )
          })}
      </div>
    </div>
  )
}
