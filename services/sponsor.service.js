import Axios from 'axios'
import { handleSuccess, handleError, authHeader } from '@/helpers'
import { API } from '@/config.json'

export const sponsorService = {
	getAll,
	getAllCurrent,
	getOne,
	editOne,
	addOne,
	deleteOne,
	changeStatus
}

// NO Authorization Required

function getAll() {
	const requestOptions = {
		url: `${API}/sponsors`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function getAllCurrent() {
	const requestOptions = {
		url: `${API}/sponsors/current`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function getOne(id) {
	const requestOptions = {
		url: `${API}/sponsors/${id}`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

// YES Authorization Required

function addOne(
	ad_client_name,
	ad_client_contact,
	ad_client_email,
	ad_client_phone,
	ad_client_website,
	ad_image_path
) {
	const requestOptions = {
		url: `${API}/sponsors/add`,
		method: 'POST',
		headers: authHeader(),
		data: {
			ad_client_name,
			ad_client_contact,
			ad_client_email,
			ad_client_phone,
			ad_client_website,
			ad_image_path
		}
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function editOne(
	ad_client_name,
	ad_client_contact,
	ad_client_email,
	ad_client_phone,
	ad_client_website,
	ad_image_path,
	id
) {
	const requestOptions = {
		url: `${API}/sponsors/edit`,
		method: 'POST',
		headers: authHeader(),
		data: {
			ad_client_name,
			ad_client_contact,
			ad_client_email,
			ad_client_phone,
			ad_client_website,
			ad_image_path,
			id
		}
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function deleteOne(id) {
	const requestOptions = {
		url: `${API}/sponsors/delete/` + id,
		method: 'GET',
		headers: authHeader()
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function changeStatus(id, status) {
	const requestOptions = {
		url: `${API}/sponsors/status`,
		method: 'POST',
		headers: authHeader(),
		data: { id, status }
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}
