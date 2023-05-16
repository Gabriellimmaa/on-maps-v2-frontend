import { httpClient } from '@/clients'
import { TGetCampusResponse } from '@/types'

export const deleteCampus = async (campusId: string): Promise<void> => {
  const { data } = await httpClient.delete<void>(
    `/api/campus/delete/${campusId}`
  )

  return data
}
