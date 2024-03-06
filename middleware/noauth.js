// const Cookie = require('js-cookie')

export default function() {
	// Cookie.remove('auth')
	sessionStorage.removeItem('auth')

	return true
}
