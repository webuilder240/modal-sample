import axios from "axios";

export type UserResponse =  {
  login: string,
  url: string
}

export async function fetchWebApi(): Promise<UserResponse | null> {
  try {
    const response = await axios.get('https://api.github.com/users/webuilder240')
    return {
      login: response.data.login,
      url: response.data.url
    }
  } catch(e) {
    console.error(e)
    return null
  }
}