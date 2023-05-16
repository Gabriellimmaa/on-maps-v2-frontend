import { httpClient } from '@/clients'

export const deleteEquipment = async (equipmentId: string): Promise<void> => {
  const { data } = await httpClient.delete<void>(
    `/api/equipment/delete/${equipmentId}`
  )

  return data
}
