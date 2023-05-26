import { httpClient } from '@/clients'

export const deletePlace = async (placeId: string): Promise<void> => {
  const { data } = await httpClient.delete<void>(`/api/place/delete/${placeId}`)

  return data
}
