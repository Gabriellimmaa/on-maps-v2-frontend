import { httpClient } from '@/clients'
import { TCategory, TPostCreateCategoryBody } from '@/types'

export const putCategory = async (
  categoryId: string,
  body: TPostCreateCategoryBody
): Promise<TCategory> => {
  const { data } = await httpClient.put<TCategory>(
    `/api/category/update/${categoryId}`,
    body
  )

  return data
}
