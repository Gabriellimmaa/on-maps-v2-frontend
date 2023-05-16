import { httpClient } from '@/clients'
import { TPostCreateUniversityBody, TUniversity } from '@/types'

export const postUniversity = async (
  body: TPostCreateUniversityBody
): Promise<TUniversity> => {
  const { data } = await httpClient.post<TUniversity>(`/api/university`, body)

  return data
}
