import Axios from 'axios'
import { handleSuccess, handleError, authHeader } from '@/helpers'
import { API } from '@/config.json'

export const newsService = {
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
		url: `${API}/news`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getAllCurrent() {
	const requestOptions = {
		url: `${API}/news/current`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getOne(id) {
	const requestOptions = {
		url: `${API}/news/` + id,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

// YES Authorization Required

function addOne(
	news_title,
	news_synop,
	news_article,
	news_event_dt,
	news_release_dt,
	news_expire_dt
) {
	const requestOptions = {
		url: `${API}/news/add`,
		method: 'POST',
		headers: authHeader(),
		data: {
			news_title,
			news_synop,
			news_article,
			news_event_dt,
			news_release_dt,
			news_expire_dt,
		},
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function deleteOne(id) {
	const requestOptions = {
		url: `${API}/news/delete/` + id,
		method: 'GET',
		headers: authHeader(),
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function editOne(
	id,
	news_title,
	news_synop,
	news_article,
	news_event_dt,
	news_release_dt,
	news_expire_dt
) {
	const requestOptions = {
		url: `${API}/news/edit`,
		method: 'POST',
		headers: authHeader(),
		data: {
			id,
			news_title,
			news_synop,
			news_article,
			news_event_dt,
			news_release_dt,
			news_expire_dt,
		},
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function changeStatus(id, status) {
	const requestOptions = {
		url: `${API}/news/status`,
		method: 'POST',
		headers: authHeader(),
		data: { id, status },
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}
