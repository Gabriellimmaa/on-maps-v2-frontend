import { httpClient } from '@/clients'
import { TEquipment, TPostCreateEquipmentBody } from '@/types'

export const putEquipment = async (
  id: string,
  body: TPostCreateEquipmentBody
): Promise<TEquipment> => {
  const { data } = await httpClient.put<TEquipment>(
    `/api/equipment/update/${id}`,
    body
  )

  return data
}
