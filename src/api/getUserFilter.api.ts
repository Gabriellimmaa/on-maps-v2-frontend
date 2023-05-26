import { httpClient } from '@/clients'
import { TGetUserFilterQueryParams, TUser } from '@/types'

export const getUserFilter = async (
  queryParams: TGetUserFilterQueryParams
): Promise<TUser[]> => {
  const { data } = await httpClient.get<TUser[]>(`/api/user/filter`, {
    params: queryParams,
  })

  return data
}
