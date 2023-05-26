export type TPostDiscordWebhookResponse = {
  id: string
  type: number
  content: string
  channel_id: string
  author: {
    bot: boolean
    id: string
    username: string
    avatar: string | null
    discriminator: string
  }
  attachments: DiscordAttachment[]
  embeds: any[] // Se tiver uma estrutura específica para os embeds, substitua por uma tipagem apropriada
  mentions: any[] // Se tiver uma estrutura específica para as menções, substitua por uma tipagem apropriada
  mention_roles: any[] // Se tiver uma estrutura específica para os mention_roles, substitua por uma tipagem apropriada
  pinned: boolean
  mention_everyone: boolean
  tts: boolean
  timestamp: string
  edited_timestamp: string | null
  flags: number
  components: any[] // Se tiver uma estrutura específica para os components, substitua por uma tipagem apropriada
  webhook_id: string
}

interface DiscordAttachment {
  id: string
  filename: string
  size: number
  url: string
  proxy_url: string
  width: number
  height: number
  content_type: string
}
