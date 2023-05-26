import { httpClient } from '@/clients'
import { TEvent } from '@/types'

export const getEventById = async (id: number): Promise<TEvent> => {
  const { data } = await httpClient.get<TEvent>(`/api/event/${id}`)

  return data
}
