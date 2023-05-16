import { httpClient } from '@/clients'
import { TGetEquipmentResponse } from '@/types'

export const getEquipment = async (): Promise<TGetEquipmentResponse> => {
  const { data } = await httpClient.get<TGetEquipmentResponse>(`/api/equipment`)

  return data
}
