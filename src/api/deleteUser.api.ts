import { httpClient } from '@/clients'

export const deleteUser = async (id: string): Promise<void> => {
  const { data } = await httpClient.delete<void>(`/api/user/delete/${id}`)

  return data
}
