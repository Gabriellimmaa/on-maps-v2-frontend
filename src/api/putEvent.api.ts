import { httpClient } from '@/clients'
import { TEvent, TPostCreateEventBody } from '@/types'

export const putEvent = async (
  id: number,
  body: Partial<TPostCreateEventBody>
): Promise<TEvent> => {
  const { data } = await httpClient.put<TEvent>(`/api/user/update/${id}`, body)

  return data
}
