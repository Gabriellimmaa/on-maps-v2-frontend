import { httpClient } from '@/clients'
import { TGetPlaceFilterQueryParams, TPlace } from '@/types'

export const getPlaceFilter = async (
  queryParams: TGetPlaceFilterQueryParams
): Promise<TPlace[]> => {
  const { data } = await httpClient.get<TPlace[]>(`/api/place/filter`, {
    params: queryParams,
  })

  return data
}
