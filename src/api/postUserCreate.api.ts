import { httpClient } from '@/clients'
import { TPostCreateUserBody } from '@/types'

export const postUserCreate = async (
  body: TPostCreateUserBody
): Promise<void> => {
  const { data } = await httpClient.post<void>(`/api/user/create`, body)

  return data
}
