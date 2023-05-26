import { httpClient } from '@/clients'
import { TPostLoginUserBody, TPostLoginUserResponse } from '@/types'

export const postUserLogin = async (
  body: TPostLoginUserBody
): Promise<TPostLoginUserResponse> => {
  const { data } = await httpClient.post<TPostLoginUserResponse>(
    `/api/user/login`,
    body
  )

  return data
}
