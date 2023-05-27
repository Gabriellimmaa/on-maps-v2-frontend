import { httpClient } from '@/clients'
import { TCampus, TGetCampusResponse } from '@/types'

export const getCampusById = async (id: number): Promise<TCampus> => {
  const { data } = await httpClient.get<TCampus>(`/api/campus/${id}`)

  return data
}
