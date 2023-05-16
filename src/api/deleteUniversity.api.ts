import { httpClient } from '@/clients'
import { TGetCampusResponse } from '@/types'

export const deleteUniversity = async (universityId: string): Promise<void> => {
  const { data } = await httpClient.delete<void>(
    `/university/delete/${universityId}`
  )

  return data
}
