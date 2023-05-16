import { httpClient } from '@/clients'
import { TCategory, TPostCreateCategoryBody } from '@/types'

export const postCategory = async (
  body: TPostCreateCategoryBody
): Promise<TCategory> => {
  const { data } = await httpClient.post<TCategory>(`/category/create`, {
    body,
  })

  return data
}
