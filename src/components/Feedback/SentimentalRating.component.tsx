import * as React from 'react'
import { styled } from '@mui/material/styles'
import Rating, { IconContainerProps } from '@mui/material/Rating'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import { Box, BoxProps, IconProps } from '@mui/material'

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}))

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props
  return <span {...other}>{customIcons[value].icon}</span>
}

const styles = {
  icon: {
    fontSize: 45,
  },
}

const customIcons: {
  [index: string]: {
    icon: React.ReactElement
    label: string
  }
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" sx={styles.icon} />,
    label: 'Muito insatisfeito',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" sx={styles.icon} />,
    label: 'Insatisfeito',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" sx={styles.icon} />,
    label: 'Indiferente',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" sx={styles.icon} />,
    label: 'Satisfeito',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" sx={styles.icon} />,
    label: 'Muito satisfeito',
  },
}

export const SentimentalRating = ({
  boxProps,
  iconProps,
  value,
  setValue,
}: {
  boxProps?: BoxProps
  iconProps?: IconProps
  value: number | null
  setValue: (value: number) => void
}) => {
  return (
    <Box {...boxProps}>
      <StyledRating
        name="highlight-selected-only"
        defaultValue={2}
        IconContainerComponent={IconContainer}
        getLabelText={(value: number) => customIcons[value].label}
        highlightSelectedOnly
        onChange={(event, newValue) => {
          if (newValue) {
            setValue(newValue)
          }
        }}
        value={value}
      />
    </Box>
  )
}
