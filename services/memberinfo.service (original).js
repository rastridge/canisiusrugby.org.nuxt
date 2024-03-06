import Axios from 'axios'
import { handleSuccess, handleError, authHeader } from '@/helpers'
import { API } from '@/config.json'

export const memberinfoService = {
	getAll,
	makeLabels
}

// Authorization Required

function makeLabels(labelType) {
	const requestOptions = {
		url: `${API}/memberinfo/labels`,
		method: 'POST',
		headers: authHeader(),
		data: {
			labelType
		}
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}

// NO Authorization Required

function getAll() {
	const requestOptions = {
		url: `${API}/memberinfo`,
		headers: authHeader(),
		method: 'GET'
	}
	return Axios(requestOptions)
		.then(handleSuccess)
		.catch(handleError)
}
