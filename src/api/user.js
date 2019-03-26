import Cookies from 'js-cookie'

const userKey = 'up'

export function getUser() {
  return Cookies.get(userKey)
}

export function setUser(data) {
	return Cookies.set(userKey, data,{expires:7})
}

export function removeUser() {
  return Cookies.remove(userKey)
}