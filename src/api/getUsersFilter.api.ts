import { httpClient } from '@/clients'
import { TGetPlaceFilterQueryParams, TPlace } from '@/types'

export const getUsersFilter = async (
  queryParams: TGetPlaceFilterQueryParams
): Promise<TPlace[]> => {
  const { data } = await httpClient.get<TPlace[]>(`/users/filter`, {
    params: queryParams,
  })

  return data
}
