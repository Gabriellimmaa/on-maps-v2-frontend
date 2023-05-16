import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from './styles/MapSideBar.module.css'
import { FaUser } from 'react-icons/fa'
import { DataMapCategories, DataCampus, DataEvents } from '@/data'
import Image from 'next/image'
import ImageHeader from '@/assets/header.png'
import { IoClose } from 'react-icons/io5'
import { useMapInfo } from '@/context/_useMapInfo.context'

export function MapSideBar() {
  const { position, setPosition, config, setConfig, viewMenu, setViewMenu } =
    useMapInfo()

  const router = useRouter()
  const [latitudeUser, setLatitudeUser] = useState('')
  const [longitudeUser, setLongitudeUser] = useState('')
  const [range, setRange] = useState('1')
  const [inputCheck, setCheck] = useState(true)

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  function showPosition(position: any) {
    setPosition({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  }

  function handleMyLocaltion() {
    router.push(`/map/${latitudeUser}/${longitudeUser}`)
  }

  return (
    <>
      <div
        className={
          viewMenu ? `${styles.sidebar} ${styles.active}` : styles.sidebar
        }
      >
        {/* header */}
        <section className={`${styles.header} ${styles.tag}`}>
          <Link href="/">
            <Image src={ImageHeader} alt="logo" className={styles.image} />
          </Link>
          <IoClose
            className={styles.icon}
            size={20}
            onClick={() => {
              setViewMenu(false)
            }}
          />
        </section>
        {/* my location */}
        <section className={styles.tag}>
          <div className={styles.title}>
            <FaUser className={styles.icon} />
            <b onClick={getLocation}>Sua Localização</b>
          </div>
        </section>
        {/* campus */}
        <section className={styles.tag}>
          <div className={styles.title}>
            {/* <FaMapMarkerAlt className={styles.icon} /> */}
            <b onClick={handleMyLocaltion}>Campus</b>
          </div>
          <ul>
            {DataCampus.map((campus, _index) => (
              <li key={_index}>
                <label
                  className={styles.radio}
                  onClick={() => {
                    setPosition({
                      latitude: campus.lat,
                      longitude: campus.lng,
                    })
                  }}
                >
                  <span>{campus.title}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>
        {/* events */}
        <section className={`${styles.events} ${styles.tag}`}>
          <div className={styles.title}>
            {/* <AiFillCalendar className={styles.icon} /> */}
            <b>Eventos</b>
          </div>
          <ul>
            {DataEvents.map((event, _index) => (
              <li key={_index}>
                <Link href={`/place/${event.id}`} className={styles.radio}>
                  {event.title}
                  <span>{event.date}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        {/* settings */}
        <section className={styles.tag}>
          <div className={styles.title}>
            {/* <FaCog className={styles.icon} /> */}
            <b>Configurações</b>
          </div>
          <ul>
            <li>
              <label className={styles.range}>
                <span>Tamanho icone:</span>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  defaultValue={range}
                  onChange={(e) => {
                    setRange(e.target.value)
                  }}
                />
              </label>
            </li>
            {DataMapCategories.map((category, _index) => (
              <li key={_index}>
                <label className={styles.radio}>
                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={config === category.value}
                    onChange={(e) => {
                      setConfig(e.target.value)
                    }}
                  />
                  <span>{category.title}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>
        {/* <section className={styles.tag} id="infos">
          <ul>
            <li>
              <i
                className="fa fa-info-circle "
                style={{
                  color: "white",
                  marginRight: "10px",
                  fontSize: "20px",
                  marginBottom: "10px",
                }}
              ></i>
              <label style={{ fontWeight: "bold" }}>Informações</label>
            </li>
            <li>
              <label>Latitude: {22222213}</label>
            </li>
            <li>
              <label>Longitude: {88888888}</label>
            </li>
          </ul>
        </section> */}
      </div>
      <div
        className={styles.backdrop}
        style={{
          display: viewMenu ? 'block' : 'none',
        }}
      ></div>
    </>
  )
}
