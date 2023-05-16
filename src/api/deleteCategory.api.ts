import { httpClient } from '@/clients'

export const deleteCategory = async (categoryId: string): Promise<void> => {
  const { data } = await httpClient.delete<void>(
    `/api/category/delete/${categoryId}`
  )

  return data
}
