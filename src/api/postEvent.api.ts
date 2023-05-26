import { httpClient } from '@/clients'
import { TEvent, TPostCreateEventBody } from '@/types'

export const postEvent = async (
  body: TPostCreateEventBody
): Promise<TEvent> => {
  const { data } = await httpClient.post<TEvent>(`/api/event/create`, body)

  return data
}
