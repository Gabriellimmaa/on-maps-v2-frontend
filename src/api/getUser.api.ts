import { httpClient } from '@/clients'
import { TUser } from '@/types'

export const getUser = async (id: number): Promise<TUser> => {
  const { data } = await httpClient.get<TUser>(`/api/user/${id}`)
  return data
}
