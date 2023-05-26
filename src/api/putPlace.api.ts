import { httpClient } from '@/clients'
import { TEvent, TPostCreatePlaceBody } from '@/types'

export const putPlace = async (
  id: number,
  body: Partial<TPostCreatePlaceBody>
): Promise<TEvent> => {
  const { data } = await httpClient.put<TEvent>(`/api/place/update/${id}`, body)

  return data
}
