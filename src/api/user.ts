import axios from "axios";

export type UserResponse =  {
  login: string,
  url: string
}

export type fetchWebApiParams = {
  user: string
}

export async function fetchWebApi(params: fetchWebApiParams): Promise<UserResponse | null> {
  const response = await axios.get(`https://api.github.com/users/${params.user}`)
  return {
    login: response.data.login,
    url: response.data.url
  }
}