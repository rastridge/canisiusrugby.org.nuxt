import Axios from 'axios'
import { handleSuccess, handleError, authHeader } from '@/helpers'
import { API } from '@/config.json'

export const smsService = {
	getAll,
	getOne,
	editOne,
	sendSMS,
	addOne,
	deleteOne,
	changeStatus
}

// NO Authorization Required

function getAll() {
	const requestOptions = {
		url: `${API}/sms`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function getOne(id) {
	const requestOptions = {
		url: `${API}/sms/${id}`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

// YES Authorization Required

function addOne(sms_member_type_id, sms_subject, sms_body_text) {
	const requestOptions = {
		url: `${API}/sms/add`,
		method: 'POST',
		headers: authHeader(),
		data: {
			sms_member_type_id,
			sms_subject,
			sms_body_text
		}
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function editOne(id, sms_member_type_id, sms_subject, sms_body_text) {
	const requestOptions = {
		url: `${API}/sms/edit`,
		method: 'POST',
		headers: authHeader(),
		data: {
			sms_member_type_id,
			sms_subject,
			sms_body_text,
			id
		}
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function sendSMS(id, sms_body_text, sms_recipients) {
	const requestOptions = {
		url: `${API}/sms/send`,
		method: 'POST',
		headers: authHeader(),
		data: {
			id,
			sms_body_text,
			sms_recipients
		}
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function deleteOne(id) {
	const requestOptions = {
		url: `${API}/sms/delete/` + id,
		method: 'GET',
		headers: authHeader()
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function changeStatus(id, status) {
	const requestOptions = {
		url: `${API}/sms/status`,
		method: 'POST',
		headers: authHeader(),
		data: { id, status }
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}
