import { httpClient } from '@/clients'
import {
  TGetUniversityFilterQueryParams,
  TGetUniversityResponse,
} from '@/types'

export const getUniversityFilter = async (
  queryParams?: TGetUniversityFilterQueryParams
): Promise<TGetUniversityResponse> => {
  const { data } = await httpClient.get<TGetUniversityResponse>(
    `/api/university/filter`,
    {
      params: queryParams,
    }
  )

  return data
}
