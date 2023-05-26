import { discordClient } from '@/clients'
import { TPostDiscordWebhookResponse } from '@/types'

export const postDiscordWebhook = async (
  formData: FormData
): Promise<TPostDiscordWebhookResponse> => {
  const { data } = await discordClient.post<TPostDiscordWebhookResponse>(
    ``,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )

  return data
}
