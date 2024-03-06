import Axios from 'axios'
import { handleSuccess, handleError, authHeader } from '@/helpers'
import { API } from '@/config.json'

export const contentService = {
	getAll,
	getCustomMenuItems,
	getOne,
	editOne,
	addOne,
	deleteOne,
	changeStatus,
}

// NO Authorization Required

function getAll() {
	const requestOptions = {
		url: `${API}/content`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getCustomMenuItems() {
	const requestOptions = {
		url: `${API}/content/menu`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getOne(id) {
	const requestOptions = {
		url: `${API}/content/${id}`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

// YES Authorization Required

function addOne(
	content_name,
	content_body,
	content_order,
	content_release_dt,
	content_expire_dt
) {
	const requestOptions = {
		url: `${API}/content/add`,
		method: 'POST',
		headers: authHeader(),
		data: {
			content_name,
			content_body,
			content_order,
			content_release_dt,
			content_expire_dt,
		},
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function editOne(
	id,
	content_name,
	content_body,
	content_order,
	content_release_dt,
	content_expire_dt
) {
	const requestOptions = {
		url: `${API}/content/edit`,
		method: 'POST',
		headers: authHeader(),
		data: {
			content_name,
			content_body,
			content_order,
			content_release_dt,
			content_expire_dt,
			id,
		},
	}
	// eslint-disable-next-line no-console
	// console.log('requestOptions', requestOptions.data)
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function deleteOne(id) {
	const requestOptions = {
		url: `${API}/content/delete/` + id,
		method: 'GET',
		headers: authHeader(),
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function changeStatus(id, status) {
	const requestOptions = {
		url: `${API}/content/status`,
		method: 'POST',
		headers: authHeader(),
		data: { id, status },
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}
