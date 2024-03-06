import Axios from 'axios'
import { handleSuccess, handleError, authHeader } from '@/helpers'
import { API } from '@/config.json'

export const newsletterService = {
	getAll,
	getAllList,
	getOne,
	trackOne,
	editOne,
	deleteOne,
	addOne,
	getRecipientTypes,
	sendNewsletter,
	changeStatus,
}

// NO Authorization Required

function getAll() {
	const requestOptions = {
		url: `${API}/newsletters`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}
function getAllList() {
	const requestOptions = {
		url: `${API}/newsletters/list`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getOne(id) {
	const requestOptions = {
		url: `${API}/newsletters/` + id,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function trackOne() {
	const requestOptions = {
		url: `${API}/newsletters/track`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

// YES Authorization Required

function addOne(
	newsletter_recipient_type_id,
	admin_user_id,
	newsletter_subject,
	newsletter_body_text,
	newsletter_body_html,
	newsletter_sent,
	newsletter_send,
	newsletter_send_complete,
	newsletter_send_status
) {
	const requestOptions = {
		url: `${API}/newsletters/add`,
		method: 'POST',
		headers: authHeader(),
		data: {
			newsletter_recipient_type_id,
			admin_user_id,
			newsletter_subject,
			newsletter_body_text,
			newsletter_body_html,
			newsletter_sent,
			newsletter_send,
			newsletter_send_complete,
			newsletter_send_status,
		},
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function editOne(
	id,
	newsletter_recipient_type_id,
	admin_user_id,
	newsletter_subject,
	newsletter_body_text,
	newsletter_body_html,
	newsletter_sent,
	newsletter_send,
	newsletter_send_complete,
	newsletter_send_status
) {
	const requestOptions = {
		url: `${API}/newsletters/edit`,
		method: 'POST',
		headers: authHeader(),
		data: {
			id,
			newsletter_recipient_type_id,
			admin_user_id,
			newsletter_subject,
			newsletter_body_text,
			newsletter_body_html,
			newsletter_sent,
			newsletter_send,
			newsletter_send_complete,
			newsletter_send_status,
		},
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function deleteOne(id) {
	const requestOptions = {
		url: `${API}/newsletters/delete/` + id,
		method: 'GET',
		headers: authHeader(),
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function changeStatus(id, status) {
	const requestOptions = {
		url: `${API}/newsletters/status`,
		method: 'POST',
		headers: authHeader(),
		data: { id, status },
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getRecipientTypes() {
	const requestOptions = {
		url: `${API}/newsletters/recipienttypes`,
		method: 'GET',
		headers: authHeader(),
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function sendNewsletter(
	id,
	newsletter_subject,
	newsletter_body_html,
	recipients
) {
	const requestOptions = {
		url: `${API}/newsletters/send`,
		method: 'POST',
		headers: authHeader(),
		data: {
			id,
			newsletter_subject,
			newsletter_body_html,
			recipients,
		},
	}
	// eslint-disable-next-line no-console
	// console.log({ requestOptions })
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}
