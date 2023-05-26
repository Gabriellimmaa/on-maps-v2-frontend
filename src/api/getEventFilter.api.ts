import { httpClient } from '@/clients'
import { TGetEventFilterQueryParams, TEvent } from '@/types'

export const getEventFilter = async (
  queryParams: TGetEventFilterQueryParams
): Promise<TEvent[]> => {
  const { data } = await httpClient.get<TEvent[]>(`/api/event/filter`, {
    params: queryParams,
  })

  return data
}
