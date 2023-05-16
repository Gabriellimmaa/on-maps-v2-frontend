import { httpClient } from '@/clients'
import { TGetCategoryResponse } from '@/types'

export const getCategory = async (): Promise<TGetCategoryResponse> => {
  const { data } = await httpClient.get<TGetCategoryResponse>(`/api/category`)

  return data
}
