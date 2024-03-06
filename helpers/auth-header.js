// const Cookie = require('js-cookie')

export function authHeader() {
	// return authorization header with jwt token
	// const user = JSON.parse(Cookie.get('auth'))
	const user = JSON.parse(sessionStorage.getItem('auth'))
	if (user && user.token) {
		return {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + user.token
		}
	} else {
		return {}
	}
}
