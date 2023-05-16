import { httpClient } from '@/clients'
import { TPostCreatePlaceBody } from '@/types'

export const postPlace = async (body: TPostCreatePlaceBody): Promise<void> => {
  const { data } = await httpClient.post<void>(`/place`, body)

  return data
}
