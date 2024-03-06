import Axios from 'axios'
import { handleSuccess, handleError } from '@/helpers'
import { API } from '@/config.json'

export const imageService = {
	getWofImage,
	setAdImage,
	setClubImage
}

function getWofImage(file) {
	const fD = new FormData()
	fD.append('file', file)

	const requestOptions = {
		url: `${API}/image/wof-image`,
		method: 'POST',
		headers: { 'Content-Type': 'multipart/form-data' },
		data: fD
	}
	return Axios(requestOptions)
		.catch(handleError)
		.then(handleSuccess)
}

function setClubImage(file) {
	const fD = new FormData()
	fD.append('file', file)

	const requestOptions = {
		url: `${API}/image/clubhouse-image`,
		method: 'POST',
		headers: { 'Content-Type': 'multipart/form-data' },
		data: fD
	}
	return Axios(requestOptions)
		.catch(handleError)
		.then(handleSuccess)
}

function setAdImage(file) {
	const fD = new FormData()
	fD.append('file', file)

	const requestOptions = {
		url: `${API}/image/ad-image`,
		method: 'POST',
		headers: { 'Content-Type': 'multipart/form-data' },
		data: fD
	}
	return Axios(requestOptions)
		.catch(handleError)
		.then(handleSuccess)
}
