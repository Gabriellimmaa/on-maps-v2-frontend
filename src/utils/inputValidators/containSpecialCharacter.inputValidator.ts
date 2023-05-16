export const containSpecialCharacter = (value?: string): boolean =>
  !!value && /^.*(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]+).*$/.test(value)
