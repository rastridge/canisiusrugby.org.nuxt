import Axios from 'axios'
import { handleSuccess, handleError, authHeader } from '@/helpers'
import { API } from '@/config.json'

export const archiveService = {
	getAll,
	getOne,
	editOne,
	addOne,
	setDoc,
	deleteOne,
	changeStatus
}

// NO Authorization Required

function setDoc(file) {
	const fD = new FormData()
	fD.append('file', file)

	const requestOptions = {
		url: `${API}/archive/doc`,
		method: 'POST',
		headers: { 'Content-Type': 'multipart/form-data' },
		data: fD
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function getAll() {
	const requestOptions = {
		url: `${API}/archive`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function getOne(id) {
	const requestOptions = {
		url: `${API}/archive/${id}`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

// YES Authorization Required

function addOne(
	archive_title,
	archive_description,
	archive_filepath,
	archive_date
) {
	const requestOptions = {
		url: `${API}/archive/add`,
		method: 'POST',
		headers: authHeader(),
		data: {
			archive_title,
			archive_description,
			archive_filepath,
			archive_date
		}
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function editOne(
	id,
	archive_title,
	archive_description,
	archive_filepath,
	archive_date
) {
	const requestOptions = {
		url: `${API}/archive/edit`,
		method: 'POST',
		headers: authHeader(),
		data: {
			archive_title,
			archive_description,
			archive_filepath,
			archive_date,
			id
		}
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function deleteOne(id) {
	const requestOptions = {
		url: `${API}/archive/delete/` + id,
		method: 'GET',
		headers: authHeader()
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function changeStatus(id, status) {
	const requestOptions = {
		url: `${API}/archive/status`,
		method: 'POST',
		headers: authHeader(),
		data: { id, status }
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}
