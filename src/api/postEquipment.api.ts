import { httpClient } from '@/clients'
import { TEquipment, TPostCreateEquipmentBody } from '@/types'

export const postEquipment = async (
  body: TPostCreateEquipmentBody
): Promise<TEquipment> => {
  const { data } = await httpClient.post<TEquipment>(
    `/api/equipment/create`,
    body
  )

  return data
}
