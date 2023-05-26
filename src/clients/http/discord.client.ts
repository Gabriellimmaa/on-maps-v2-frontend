import axios from 'axios'

export const discordClient = axios.create({
  baseURL: process.env.DISCORD_WEBHOOK,
})

export default discordClient
