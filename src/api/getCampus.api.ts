import { httpClient } from '@/clients'
import { TGetCampusResponse } from '@/types'

export const getCampus = async (): Promise<TGetCampusResponse> => {
  const { data } = await httpClient.get<TGetCampusResponse>(`/api/campus`)

  return data
}
