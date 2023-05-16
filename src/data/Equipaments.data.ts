import { TEquipaments } from '@/types/TEquipaments.type'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast'
import ComputerIcon from '@mui/icons-material/Computer'
import DeskIcon from '@mui/icons-material/Desk'
import WineBarIcon from '@mui/icons-material/WineBar'
import FastfoodIcon from '@mui/icons-material/Fastfood'
import ElevatorIcon from '@mui/icons-material/Elevator'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice'
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled'
import PrintIcon from '@mui/icons-material/Print'
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack'
import LiveTvIcon from '@mui/icons-material/LiveTv'
import WifiIcon from '@mui/icons-material/Wifi'

type TEquipamentsData = {
  title: string
  icon: any
  value: TEquipaments
}[]

export const DataEquipaments: TEquipamentsData = [
  {
    title: 'Ar Condicionado',
    icon: AcUnitIcon,
    value: 'ar condition',
  },
  {
    title: 'Livros',
    icon: LibraryBooksIcon,
    value: 'books',
  },
  {
    title: 'Café',
    icon: FreeBreakfastIcon,
    value: 'cafe',
  },
  {
    title: 'Computador',
    icon: ComputerIcon,
    value: 'computer',
  },
  {
    title: 'Mesa',
    icon: DeskIcon,
    value: 'desk',
  },
  {
    title: 'Elevador',
    icon: ElevatorIcon,
    value: 'elevator',
  },
  {
    title: 'Bebida',
    icon: WineBarIcon,
    value: 'drink',
  },
  {
    title: 'Comida',
    icon: FastfoodIcon,
    value: 'food',
  },
  {
    title: 'Academia',
    icon: FitnessCenterIcon,
    value: 'gym',
  },
  {
    title: 'Microfone',
    icon: KeyboardVoiceIcon,
    value: 'microphone',
  },
  {
    title: 'Telefone',
    icon: PhoneEnabledIcon,
    value: 'phone',
  },
  {
    title: 'Impressora',
    icon: PrintIcon,
    value: 'printer',
  },
  {
    title: 'Projetor',
    icon: VideoCameraBackIcon,
    value: 'projector',
  },
  {
    title: 'Televisão',
    icon: LiveTvIcon,
    value: 'television',
  },
  {
    title: 'Wifi',
    icon: WifiIcon,
    value: 'wifi',
  },
]
