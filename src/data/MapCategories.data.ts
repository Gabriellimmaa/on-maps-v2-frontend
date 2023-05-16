import { SiGoogleclassroom } from 'react-icons/si'
import { ImLab } from 'react-icons/im'
import { IoLibrarySharp } from 'react-icons/io5'
import { FaBath } from 'react-icons/fa'
import { MdFastfood } from 'react-icons/md'
import { GiParkBench } from 'react-icons/gi'
import { BsFillCarFrontFill } from 'react-icons/bs'
import { IoAccessibilitySharp } from 'react-icons/io5'
import { RiHospitalFill } from 'react-icons/ri'
import { HiLibrary } from 'react-icons/hi'
import { AiFillStar, AiFillPushpin } from 'react-icons/ai'
import { HiOfficeBuilding } from 'react-icons/hi'
import { SiOnlyoffice } from 'react-icons/si'
import { TMapCategories } from '../types'
import { IconType } from 'react-icons/lib'
import iconUser from '@/assets/UserIcon.png'
import icon1 from '@/assets/Markers/01.png'
import icon2 from '@/assets/Markers/02.png'
import icon3 from '@/assets/Markers/03.png'
import icon4 from '@/assets/Markers/04.png'
import icon5 from '@/assets/Markers/05.png'
import icon6 from '@/assets/Markers/06.png'
import icon7 from '@/assets/Markers/07.png'
import { StaticImageData } from 'next/image'

export const DataMapCategories: {
  title: string
  icon: IconType
  markerIcon?: StaticImageData
  value: TMapCategories
}[] = [
  {
    title: 'Todos',
    icon: AiFillPushpin,
    value: 'todos',
  },
  {
    title: 'Eventos',
    icon: AiFillStar,
    markerIcon: icon1,
    value: 'evento',
  },
  {
    title: 'Salas',
    icon: SiGoogleclassroom,
    markerIcon: icon2,
    value: 'sala',
  },
  {
    title: 'Laboratórios',
    icon: ImLab,
    markerIcon: icon3,
    value: 'laboratório',
  },
  {
    title: 'Secretarias',
    icon: HiOfficeBuilding,
    markerIcon: icon4,
    value: 'secretaria',
  },

  {
    title: 'Bibliotecas',
    icon: IoLibrarySharp,
    markerIcon: icon5,
    value: 'biblioteca',
  },
  {
    title: 'Auditórios',
    icon: HiLibrary,
    markerIcon: icon6,
    value: 'auditório',
  },
  {
    title: 'Banheiros',
    icon: FaBath,
    markerIcon: icon7,
    value: 'banheiro',
  },
  {
    title: 'Lanchonetes',
    icon: MdFastfood,
    markerIcon: icon1,
    value: 'lanchonete',
  },
  {
    title: 'Clínicas',
    icon: RiHospitalFill,
    markerIcon: icon3,
    value: 'clínica',
  },
  {
    title: 'Lazer',
    icon: GiParkBench,
    markerIcon: icon4,
    value: 'lazer',
  },
  {
    title: 'Acessibilidade',
    icon: IoAccessibilitySharp,
    markerIcon: icon5,
    value: 'acessibilidade',
  },
  {
    title: 'Estacionamentos',
    icon: BsFillCarFrontFill,
    markerIcon: icon6,
    value: 'estacionamento',
  },
  {
    title: 'Outros',
    icon: SiOnlyoffice,
    markerIcon: icon7,
    value: 'outros',
  },
]
