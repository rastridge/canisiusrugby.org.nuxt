import { userService } from '@/services'

// const Cookie = require('js-cookie')
/*
const user = JSON.parse(Cookie.get('auth'))
const initialState = user
	? { status: { loggedIn: true }, user }
	: { status: {}, user: null }
*/

// export const state = () => ({ status: { loggedIn: true }, user: user })
export const state = () => ({ status: { loggedIn: false }, user: null })

/*
export const state = () => 'initialState'
*/
export const mutations = {
	loginRequest(state, user) {
		state.status = { loggingIn: true }
		state.user = user
	},
	loginSuccess(state, user) {
		state.status = { loggedIn: true }
		state.user = user
	},
	loginFailure(state) {
		state.status = {}
		state.user = null
	},
	logout(state) {
		state.status = {}
		state.user = null
	},
	updateRequest(state, user) {
		state.status = { loggingIn: true }
		state.user = user
	}
}

export const actions = {
	login({ dispatch, commit }, { username, password }) {
		commit('loginRequest', { username })
		userService
			.login(username, password)
			.then((user) => {
				commit('loginSuccess', user)
				sessionStorage.removeItem('auth')
				sessionStorage.setItem('auth', JSON.stringify(user))
				dispatch('alert/clear', '', { root: true })
				dispatch('alert/success', 'Login successful', { root: true })
				this.app.router.push({ path: '/admin/accounts/men' })
			})
			.catch(() => {
				// apparently triggered by bad status code
				commit('loginFailure')
				dispatch('alert/error', 'Login failed', { root: true })
			})
	},
	logout({ dispatch, commit }) {
		dispatch('alert/clear', '', { root: true })
		commit('logout')
		// Cookie.remove('auth')
		sessionStorage.removeItem('auth')
		this.app.router.push({ path: '/' })
	}
}
