import { httpClient } from '@/clients'
import { TFeedback } from '@/types'

export const patchFeedback = async (value: number): Promise<TFeedback> => {
  const { data } = await httpClient.patch<TFeedback>(`/api/feedback`, {
    value,
  })

  return data
}
