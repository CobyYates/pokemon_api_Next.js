import 'isomorphic-fetch'

const BASE_PATH = 'https://pokeapi.co/api/v2'
const cache = {}

const get = async id => {
  if (cache[id])
    return {
      data: cache[id],
    }

  const fetchRes = await fetch(`${BASE_PATH}/pokemon/${id}`)
  const res = await fetchRes.json()

  cache[id] = res
  return {
    data: res,
  }
}
const list = async () => {
  const fetchRes = await fetch(`${BASE_PATH}/pokemon`)
  const res = await fetchRes.json()
  console.log(res)

  return {
    data: res.results,
    count: res.count,
  }
}

const captureIdRegex = new RegExp(
  /https:\/\/pokeapi.co\/api\/v2\/pokemon\/([0-9]+)\//
)
export const getId = pokemon => {
  const { url } = pokemon
  const match = captureIdRegex.exec(url)
  if (match.length !== 2) throw Error('unmatch url')
  return match[1]
}
export default {
  get,
  list,
}
