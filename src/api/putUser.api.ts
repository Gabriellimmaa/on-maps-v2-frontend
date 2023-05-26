import { httpClient } from '@/clients'
import { TPostCreateUserBody, TUser } from '@/types'

export const putUser = async (
  id: string,
  body: Partial<TPostCreateUserBody>
): Promise<TUser> => {
  const { data } = await httpClient.put<TUser>(`/api/user/update/${id}`, body)

  return data
}
