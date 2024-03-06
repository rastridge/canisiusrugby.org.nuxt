// const Cookie = require('js-cookie')

export default function({ store, redirect }) {
	// const user = Cookie.get('auth')
	const user = JSON.parse(sessionStorage.getItem('auth'))

	// if (!store.state.authentication.status.loggedIn) {
	if (user) {
		store.commit('authentication/loginSuccess', user)
		return true
	} else {
		return redirect('/')
	}
}
