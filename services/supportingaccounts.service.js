import Axios from 'axios'
import { handleSuccess, handleError, authHeader } from '@/helpers'
import { API } from '@/config.json'

export const supportingaccountsService = {
	getAll,
	getAllCurrent,
	getOne,
	editOne,
	deleteOne,
	addOne,
	changeStatus,
}

// NO Authorization Required

function getAll() {
	const requestOptions = {
		url: `${API}/supportingaccounts`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getAllCurrent() {
	const requestOptions = {
		url: `${API}/supportingaccounts/current`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getOne(id) {
	const requestOptions = {
		url: `${API}/supportingaccounts/${id}`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

// YES Authorization Required

function addOne(
	supportingApp_name,
	supportingApp_description,
	supportingApp_url,
	supportingApp_owner,
	supportingApp_username,
	supportingApp_password
) {
	const requestOptions = {
		url: `${API}/supportingaccounts/add`,
		method: 'POST',
		headers: authHeader(),
		data: {
			supportingApp_name,
			supportingApp_description,
			supportingApp_url,
			supportingApp_owner,
			supportingApp_username,
			supportingApp_password,
		},
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function deleteOne(id) {
	const requestOptions = {
		url: `${API}/supportingaccounts/delete/${id}`,
		method: 'GET',
		headers: authHeader(),
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function editOne(
	id,
	supportingApp_name,
	supportingApp_description,
	supportingApp_url,
	supportingApp_owner,
	supportingApp_username,
	supportingApp_password
) {
	const requestOptions = {
		url: `${API}/supportingaccounts/edit`,
		method: 'POST',
		headers: authHeader(),
		data: {
			id,
			supportingApp_name,
			supportingApp_description,
			supportingApp_url,
			supportingApp_owner,
			supportingApp_username,
			supportingApp_password,
		},
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function changeStatus(id, status) {
	const requestOptions = {
		url: `${API}/supportingaccounts/status`,
		method: 'POST',
		headers: authHeader(),
		data: { id, status },
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}
