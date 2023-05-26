export const flexCenterContent = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export const alignGridEnd = {
  ...flexCenterContent,
  justifyContent: 'end',
}
export const alignGridStart = {
  ...flexCenterContent,
  justifyContent: 'start',
}

export const alignSpaceBetween = {
  ...flexCenterContent,
  justifyContent: 'space-between',
}

export const flexAlingCenter = {
  display: 'flex',
  alignItems: 'center',
}

export const backgroundImage = (url?: string) => {
  return {
    backgroundImage: `url(${url ? url : ''})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}
