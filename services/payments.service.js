import Axios from 'axios'
import { handleSuccess, handleError, authHeader } from '@/helpers'
import { API } from '@/config.json'

export const paymentsService = {
	getAll,
	getCurrent,
	getOne,
	editOne,
	addOne,
	deleteOne,
	changeStatus
}

// NO Authorization Required

function getAll() {
	const requestOptions = {
		url: `${API}/payments`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function getCurrent() {
	const requestOptions = {
		url: `${API}/payments/current`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function getOne(id) {
	const requestOptions = {
		url: `${API}/payments/${id}`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

// YES Authorization Required

function addOne(
	payment_title,
	payment_description,
	payment_paypal_button,
	release_dt,
	expire_dt
) {
	const requestOptions = {
		url: `${API}/payments/add`,
		method: 'POST',
		headers: authHeader(),
		data: {
			payment_title,
			payment_description,
			payment_paypal_button,
			release_dt,
			expire_dt
		}
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function editOne(
	id,
	payment_title,
	payment_description,
	payment_paypal_button,
	release_dt,
	expire_dt
) {
	const requestOptions = {
		url: `${API}/payments/edit`,
		method: 'POST',
		headers: authHeader(),
		data: {
			payment_title,
			payment_description,
			payment_paypal_button,
			release_dt,
			expire_dt,
			id
		}
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function deleteOne(id) {
	const requestOptions = {
		url: `${API}/payments/delete/${id}`,
		method: 'GET',
		headers: authHeader()
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function changeStatus(id, status) {
	const requestOptions = {
		url: `${API}/payments/status`,
		method: 'POST',
		headers: authHeader(),
		data: { id, status }
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}
