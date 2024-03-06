import Axios from 'axios'
import { handleSuccess, handleError, authHeader } from '@/helpers'
import { API } from '@/config.json'

export const userService = {
	login,
	reset,
	getAll,
	getOne,
	editOne,
	addOne,
	getApps,
	getAppPerms,
	resetRequest,
	resetPassword,
	deleteOne,
	changeStatus,
}

// YES Authorization Required
// const auth = store.state.authentication.user

function getAll() {
	const requestOptions = {
		url: `${API}/users`,
		method: 'GET',
		headers: authHeader(),
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getOne(id) {
	const requestOptions = {
		url: `${API}/users/` + id,
		method: 'GET',
		headers: authHeader(),
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}
function resetPassword(user, pass) {
	const requestOptions = {
		url: `${API}/users/resetpassword`,
		method: 'POST',
		data: { user, pass },
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function resetRequest(username) {
	const requestOptions = {
		url: `${API}/users/resetrequest`,
		method: 'POST',
		data: { username },
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function deleteOne(id) {
	const requestOptions = {
		url: `${API}/users/delete/` + id,
		method: 'GET',
		headers: authHeader(),
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function editOne(id, username, password, email, perms) {
	const requestOptions = {
		url: `${API}/users/edit`,
		method: 'POST',
		headers: authHeader(),
		data: { id, username, password, email, perms },
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function addOne(username, password, email) {
	const requestOptions = {
		url: `${API}/users/add`,
		method: 'POST',
		headers: authHeader(),
		data: { username, password, email },
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function changeStatus(id, status) {
	const requestOptions = {
		url: `${API}/users/status`,
		method: 'POST',
		headers: authHeader(),
		data: { id, status },
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getApps() {
	const requestOptions = {
		url: `${API}/users/apps`,
		method: 'GET',
		headers: authHeader(),
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getAppPerms() {
	const requestOptions = {
		url: `${API}/users/perms`,
		method: 'POST',
		headers: authHeader(),
		data: {},
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

// NO Authorization Required

function login(username, password) {
	const requestOptions = {
		url: `${API}/users/authenticate`,
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		data: { username, password },
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function reset(username, email) {
	const requestOptions = {
		url: `${API}/users/reset`,
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		data: { username, email },
	}
	return Axios(requestOptions)
		.catch(handleError)
		.then((user) => {
			return user
		})
}
