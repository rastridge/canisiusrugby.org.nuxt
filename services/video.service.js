import Axios from 'axios'
import { handleSuccess, handleError, authHeader } from '@/helpers'
import { API } from '@/config.json'

export const videoService = {
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
		url: `${API}/videos`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function getOne(id) {
	const requestOptions = {
		url: `${API}/videos/${id}`,
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

// YES Authorization Required

function addOne(
	video_title,
	video_synop,
	video_url,
	video_release_dt,
	video_event_dt,
	video_expire_dt
) {
	const requestOptions = {
		url: `${API}/videos/add`,
		method: 'POST',
		headers: authHeader(),
		data: {
			video_title,
			video_synop,
			video_url,
			video_release_dt,
			video_event_dt,
			video_expire_dt
		}
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function editOne(
	id,
	video_title,
	video_synop,
	video_url,
	video_release_dt,
	video_event_dt,
	video_expire_dt
) {
	const requestOptions = {
		url: `${API}/videos/edit`,
		method: 'POST',
		headers: authHeader(),
		data: {
			video_title,
			video_synop,
			video_url,
			video_release_dt,
			video_event_dt,
			video_expire_dt,
			id
		}
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function deleteOne(id) {
	const requestOptions = {
		url: `${API}/videos/delete/` + id,
		method: 'GET',
		headers: authHeader()
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

function changeStatus(id, status) {
	const requestOptions = {
		url: `${API}/videos/status`,
		method: 'POST',
		headers: authHeader(),
		data: { id, status }
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}
