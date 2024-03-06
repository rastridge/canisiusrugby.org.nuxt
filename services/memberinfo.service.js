import Axios from 'axios'
import { handleSuccess, handleError, authHeader } from '@/helpers'
import { API } from '@/config.json'

export const memberinfoService = {
	getAll,
	makeLabels2
}

// Authorization Required
function makeLabels2(labelType, member_type_id) {
	const requestOptions = {
		url: `${API}/memberinfo/makelabels`,
		method: 'POST',
		headers: authHeader(),
		data: {
			labelType,
			member_type_id
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
