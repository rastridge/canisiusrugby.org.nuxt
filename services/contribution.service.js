import Axios from 'axios'
import { handleSuccess, handleError, authHeader } from '@/helpers'
import { API } from '@/config.json'

export const contributionService = {
	getAll,
	getYearContributions,
	getTopContributors,
	getTotal,
	getAllCurrent,
	getPrevious,
	getOne,
	editOne,
	addOne,
	deleteOne,
	changeStatus
}

// NO Authorization Required

function getAll() {
	const requestOptions = {
		url: `${API}/contributions`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function getYearContributions(yr) {
	const requestOptions = {
		url: `${API}/contributions/year/${yr}`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function getTotal(yr) {
	const requestOptions = {
		url: `${API}/contributions/total/${yr}`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function getAllCurrent() {
	const requestOptions = {
		url: `${API}/contributions/current`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function getTopContributors() {
	const requestOptions = {
		url: `${API}/contributions/top`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function getOne(id) {
	const requestOptions = {
		url: `${API}/contributions/${id}`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function getPrevious(id) {
	const requestOptions = {
		url: `${API}/contributions/previous/${id}`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

// YES Authorization Required

function addOne(
	account_id,
	contribution_date,
	contribution_amount,
	contribution_showName,
	contribution_showAmount,
	contribution_comment
) {
	const requestOptions = {
		url: `${API}/contributions/add`,
		method: 'POST',
		headers: authHeader(),
		data: {
			account_id,
			contribution_date,
			contribution_amount,
			contribution_showName,
			contribution_showAmount,
			contribution_comment
		}
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function editOne(
	contribution_date,
	contribution_amount,
	contribution_showName,
	contribution_showAmount,
	contribution_comment,
	id
) {
	const requestOptions = {
		url: `${API}/contributions/edit`,
		method: 'POST',
		headers: authHeader(),
		data: {
			contribution_date,
			contribution_amount,
			contribution_showName,
			contribution_showAmount,
			contribution_comment,
			id
		}
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function deleteOne(id) {
	const requestOptions = {
		url: `${API}/contributions/delete/` + id,
		method: 'GET',
		headers: authHeader()
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function changeStatus(id, status) {
	const requestOptions = {
		url: `${API}/contributions/status`,
		method: 'POST',
		headers: authHeader(),
		data: { id, status }
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}
