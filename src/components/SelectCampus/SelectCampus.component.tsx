import * as React from 'react'
import {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
  ToggleButtonProps,
} from '@mui/material'

interface ISelectCampusProps {
  value: any
  setValue: React.Dispatch<React.SetStateAction<any>>
  buttons: {
    value: string
    label: string
  }[]
  buttonGroupProps?: Omit<ToggleButtonGroupProps, 'value' | 'onChange'>
  buttonProps?: Omit<ToggleButtonProps, 'value' | 'onChange'>
}

export function SelectCampus({
  value,
  setValue,
  buttons,
  buttonGroupProps,
  buttonProps,
}: ISelectCampusProps) {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment === null) return
    setValue(newAlignment)
  }

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={value}
        exclusive
        onChange={handleChange}
        {...buttonGroupProps}
      >
        {buttons.map(
          (
            item: {
              value: string
              label: string
            },
            _index
          ) => (
            <ToggleButton key={_index} value={item.value} {...buttonProps}>
              {item.label}
            </ToggleButton>
          )
        )}
      </ToggleButtonGroup>
    </>
  )
}
