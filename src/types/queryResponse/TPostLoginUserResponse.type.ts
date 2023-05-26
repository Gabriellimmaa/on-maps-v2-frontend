import { TUser } from '../TUser.type'

export type TPostLoginUserResponse = {
  authToken: string
  user: TUser
}
