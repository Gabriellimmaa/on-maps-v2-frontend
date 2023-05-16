import { httpClient } from '@/clients'
import { TCampus, TPostCreateCampusBody } from '@/types'

export const postCampus = async (
  body: TPostCreateCampusBody
): Promise<TCampus> => {
  const { data } = await httpClient.post<TCampus>(`/api/campus/create`, body)

  return data
}
