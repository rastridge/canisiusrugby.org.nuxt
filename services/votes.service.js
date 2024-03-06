import Axios from 'axios'
import { handleSuccess, handleError, authHeader } from '@/helpers'
import { API } from '@/config.json'

export const votesService = {
	getAll,
	getOne,
	editOne,
	addOne,
	getAllChoices,
	getUsedChoices,
	getQuestions,
	answerQuestions,
	sendBallot,
	registerBallot,
	deleteOne,
	changeStatus
}

// NO Authorization Required

function getAll() {
	const requestOptions = {
		url: `${API}/votes`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function getOne(id) {
	const requestOptions = {
		url: `${API}/votes/${id}`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function getAllChoices(id) {
	const requestOptions = {
		url: `${API}/votes/allchoices/${id}`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function getUsedChoices() {
	const requestOptions = {
		url: `${API}/votes/usedchoices`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function getQuestions(account_email) {
	const requestOptions = {
		url: `${API}/votes/questions/${account_email}`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function answerQuestions(account_email, vote_question, choices) {}

function registerBallot(account_email, answers) {
	const requestOptions = {
		url: `${API}/votes/registerballot`,
		method: 'POST',
		data: { account_email, answers }
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

// YES Authorization Required

function addOne(vote_question, choices) {
	const requestOptions = {
		url: `${API}/votes/add`,
		method: 'POST',
		headers: authHeader(),
		data: { vote_question, choices }
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function editOne(id, vote_question, choices) {
	const requestOptions = {
		url: `${API}/votes/edit`,
		method: 'POST',
		headers: authHeader(),
		data: { vote_question, choices, id }
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function sendBallot(email) {
	const requestOptions = {
		url: `${API}/votes/sendballot`,
		method: 'POST',
		data: { email }
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function deleteOne(id) {
	const requestOptions = {
		url: `${API}/votes/delete/` + id,
		method: 'GET',
		headers: authHeader()
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function changeStatus(id, status) {
	const requestOptions = {
		url: `${API}/votes/status`,
		method: 'POST',
		headers: authHeader(),
		data: { id, status }
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}
