import { httpClient } from '@/clients'
import { TGetUniversityResponse } from '@/types'

export const getUniversity = async (): Promise<TGetUniversityResponse> => {
  const { data } = await httpClient.get<TGetUniversityResponse>(`/university`)

  return data
}
