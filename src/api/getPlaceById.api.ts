import { httpClient } from '@/clients'
import { TPlace } from '@/types'

export const getPlaceById = async (placeId: string): Promise<TPlace> => {
  const { data } = await httpClient.get<TPlace>(`/place/${placeId}`)

  return data
}
