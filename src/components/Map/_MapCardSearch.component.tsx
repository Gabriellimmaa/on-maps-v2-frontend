import React, { createElement } from 'react'
import Link from 'next/link'
import styles from './styles/MapCardSearch.module.css'
import { DataMapCategories } from '@/data'
import { AiFillStar, AiOutlineRight } from 'react-icons/ai'
import { characterLimit } from '@/utils/functions'
import Image from 'next/image'
import { TPlace } from '@/types'

type TProps = {
  place: TPlace
  type?: 'grid' | 'list'
}

export function MapCardSearch({ place, type = 'list', ...rest }: TProps) {
  const icon =
    DataMapCategories.find((item) => item.value === place.category)?.icon ||
    AiFillStar

  if (!place) {
    return <div></div>
  }

  return (
    <>
      {type === 'list' ? (
        <Link href={`/place/${place.id}`} className={styles.link}>
          <div className={styles.container}>
            {createElement(icon, {
              size: 20,
              color: 'black',
            })}
            <div className={styles.text}>
              <h3 className={styles.title}>{place.name}</h3>
              <span className={styles.subtitle}>
                Tipo: {place.category} | Piso: {place.floor}
              </span>
            </div>
            <AiOutlineRight size={20} color="black" />
          </div>
        </Link>
      ) : (
        <Link href={`/place/${place.id}`}>
          <div className={styles.containerGrid}>
            <div className={styles.text}>
              <h3 className={styles.title}>
                {createElement(icon, {
                  size: 16,
                  color: 'black',
                })}
                {place.name}
              </h3>
              <div style={{ width: '100%' }}>
                <p
                  className={`${styles.subtitle} ${styles.container_subtitle}`}
                >
                  <span>Tipo: {place.category}</span>
                  <span>Piso: {place.floor}</span>
                  <span></span>
                </p>
                <p className={styles.subtitle}>
                  {characterLimit(place.description, 75)}
                </p>
              </div>
            </div>
            <div className={styles.image}>
              <Image
                src={place.image[0]?.url}
                alt="logo"
                height={80}
                width={60}
              />
            </div>
          </div>
        </Link>
      )}
    </>
  )
}
