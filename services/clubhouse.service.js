import Axios from 'axios'
import { handleSuccess, handleError, authHeader } from '@/helpers'
import { API } from '@/config.json'

export const clubhouseService = {
	getAll,
	getOne,
	editOne,
	addOne,
	deleteOne,
	changeStatus
}

// NO Authorization Required

function getAll() {
	const requestOptions = {
		url: `${API}/clubhouse`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function getOne(id) {
	const requestOptions = {
		url: `${API}/clubhouse/${id}`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

// YES Authorization Required

function addOne(
	clubhouse_title,
	clubhouse_description,
	clubhouse_filepath,
	clubhouse_category,
	clubhouse_owner,
	clubhouse_date
) {
	const requestOptions = {
		url: `${API}/clubhouse/add`,
		method: 'POST',
		headers: authHeader(),
		data: {
			clubhouse_title,
			clubhouse_description,
			clubhouse_filepath,
			clubhouse_category,
			clubhouse_owner,
			clubhouse_date
		}
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function editOne(
	id,
	clubhouse_title,
	clubhouse_description,
	clubhouse_filepath,
	clubhouse_category,
	clubhouse_owner,
	clubhouse_date
) {
	const requestOptions = {
		url: `${API}/clubhouse/edit`,
		method: 'POST',
		headers: authHeader(),
		data: {
			clubhouse_title,
			clubhouse_description,
			clubhouse_filepath,
			clubhouse_category,
			clubhouse_owner,
			clubhouse_date,
			id
		}
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function deleteOne(id) {
	const requestOptions = {
		url: `${API}/clubhouse/delete/` + id,
		method: 'GET',
		headers: authHeader()
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function changeStatus(id, status) {
	const requestOptions = {
		url: `${API}/clubhouse/status`,
		method: 'POST',
		headers: authHeader(),
		data: { id, status }
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}
