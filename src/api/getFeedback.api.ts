import { httpClient } from '@/clients'
import { TGetEventFilterQueryParams, TEvent, TFeedback } from '@/types'

export const getFeedback = async (): Promise<TFeedback> => {
  const { data } = await httpClient.get<TFeedback>(`/api/feedback`)

  return data
}
