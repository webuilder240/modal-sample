import axios, { Axios } from "axios";

export type UserResponse =  {
  login: string,
  url: string
}

export type fetchWebApiParams = {
  user: string
}

type SubmitWebApiParams = {
  id: number | null,
  content: string | null
}

type UpdateWebApiParams = {
  id: number
  content: string
}

export async function fetchWebApi(params: fetchWebApiParams): Promise<UserResponse | null> {
  const response = await axios.get(`https://api.github.com/users/${params.user}`)
  return {
    login: response.data.login,
    url: response.data.url
  }
}
export function submitWebApi(params: SubmitWebApiParams): Promise<Axios> {
  console.log(params)
  return axios.get(`https://api.github.com/users/webuilder240`)
}
export function updateWebApi(params: UpdateWebApiParams): Promise<Axios> {
  console.log(params)
  return axios.get(`https://api.github.com/users/webuilder240`)
}