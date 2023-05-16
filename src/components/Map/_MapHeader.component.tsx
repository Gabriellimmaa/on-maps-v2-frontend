import { DataMapCategories } from '@/data'
import Link from 'next/link'
import {
  createElement,
  HtmlHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'
import styles from './styles/MapHeader.module.css'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md'
import { useMapInfo } from '@/context/_useMapInfo.context'

export function MapHeader() {
  const { config, setConfig, viewMenu, setViewMenu } = useMapInfo()

  const elementRef = useRef<HTMLDivElement | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  function handleScrollLeft() {
    if (!elementRef.current) return

    const scrollAmount = elementRef.current.clientWidth / 2
    elementRef.current.scrollLeft -= scrollAmount
  }

  function handleScrollRight() {
    if (!elementRef.current) return

    const scrollAmount = elementRef.current.clientWidth / 2
    elementRef.current.scrollLeft += scrollAmount
  }

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    function handleScroll() {
      if (!element) return
      setCanScrollLeft(element.scrollLeft > 0)
      setCanScrollRight(
        element.scrollLeft + element.clientWidth < element.scrollWidth
      )
    }

    handleScroll()

    element.addEventListener('scroll', handleScroll)
    return () => element.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={
        viewMenu ? styles.container : `${styles.container} ${styles.active}`
      }
      ref={elementRef}
    >
      <label
        className={styles.button_left}
        style={{
          display: canScrollLeft ? 'flex' : 'none',
        }}
        onClick={handleScrollLeft}
      >
        <MdKeyboardArrowLeft size={25} color="black" />
      </label>
      {DataMapCategories.map((category, _index) => (
        <label
          className={
            config === category.value
              ? `${styles.item} ${styles.active}`
              : styles.item
          }
          key={_index}
          onClick={() => {
            setConfig(category.value)
          }}
        >
          {createElement(category.icon, {
            size: 12,
            color: 'black',
          })}
          <span>{category.title}</span>
        </label>
      ))}
      <label
        className={styles.button_right}
        style={{
          display: canScrollRight ? 'flex' : 'none',
        }}
        onClick={handleScrollRight}
      >
        <MdKeyboardArrowRight size={25} color="black" />
      </label>
    </div>
  )
}
