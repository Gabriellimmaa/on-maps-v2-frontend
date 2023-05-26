import { httpClient } from '@/clients'

export const deleteEvent = async (id: number): Promise<void> => {
  const { data } = await httpClient.delete<void>(`/api/event/delete/${id}`)

  return data
}
