import Axios from 'axios'
import { handleSuccess, handleError, authHeader } from '@/helpers'
import { API } from '@/config.json'

export const accountService = {
	getAll,
	getMembersOfType,
	getAllPublic,
	getOfficers,
	getRecentUpdates,
	getWof,
	getOne,
	editOne,
	editByMember,
	addOne,
	addOneByRegister,
	lookupByEmail,
	getMemberTypes,
	getMemberAdminTypes,
	deleteOne,
	changeStatus,
}

// YES Authorization Required

function deleteOne(id) {
	const requestOptions = {
		url: `${API}/accounts/delete/` + id,
		method: 'GET',
		headers: authHeader(),
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function changeStatus(id, status) {
	const requestOptions = {
		url: `${API}/accounts/status`,
		method: 'POST',
		headers: authHeader(),
		data: { id, status },
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function addOne(
	account_email,
	account_remind,
	member_firstname,
	member_lastname,
	member_nickname,
	member_position,
	member_prev_club,
	member_year,
	account_addr_street,
	account_addr_street_ext,
	account_addr_city,
	account_addr_state,
	account_addr_country,
	account_addr_postal,
	account_addr_phone,
	member_show_phone,
	member_show_addr,
	newsletter_recipient,
	mail_recipient,
	sms_recipient,
	member_pic_path,
	member_wall_of_fame_year,

	member_type_id,
	member_type2_id,
	member_admin_type_id,
	member_admin_type2_id
) {
	const requestOptions = {
		url: `${API}/accounts/add`,
		method: 'POST',
		headers: authHeader(),
		data: {
			account_email,
			account_remind,
			member_firstname,
			member_lastname,
			member_nickname,
			member_position,
			member_prev_club,
			member_year,
			account_addr_street,
			account_addr_street_ext,
			account_addr_city,
			account_addr_state,
			account_addr_country,
			account_addr_postal,
			account_addr_phone,
			member_show_phone,
			member_show_addr,
			newsletter_recipient,
			mail_recipient,
			sms_recipient,
			member_pic_path,
			member_wall_of_fame_year,

			member_type_id,
			member_type2_id,
			member_admin_type_id,
			member_admin_type2_id,
		},
	}

	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function addOneByRegister(
	account_email,
	account_remind,
	member_firstname,
	member_lastname,
	member_nickname,
	member_position,
	member_prev_club,
	member_year,
	account_addr_street,
	account_addr_street_ext,
	account_addr_city,
	account_addr_state,
	account_addr_country,
	account_addr_postal,
	account_addr_phone,
	member_show_phone,
	member_show_addr,
	newsletter_recipient,
	mail_recipient,
	sms_recipient,
	member_pic_path,
	member_wall_of_fame_year,

	member_type_id,
	member_type2_id,
	member_admin_type_id,
	member_admin_type2_id
) {
	const requestOptions = {
		url: `${API}/accounts/addbyregister`,
		method: 'POST',
		data: {
			account_email,
			account_remind,
			member_firstname,
			member_lastname,
			member_nickname,
			member_position,
			member_prev_club,
			member_year,
			account_addr_street,
			account_addr_street_ext,
			account_addr_city,
			account_addr_state,
			account_addr_country,
			account_addr_postal,
			account_addr_phone,
			member_show_phone,
			member_show_addr,
			newsletter_recipient,
			mail_recipient,
			sms_recipient,
			member_pic_path,
			member_wall_of_fame_year,

			member_type_id,
			member_type2_id,
			member_admin_type_id,
			member_admin_type2_id,
		},
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function editByMember(
	id,
	account_email,
	member_firstname,
	member_lastname,
	account_addr_street,
	account_addr_street_ext,
	account_addr_city,
	account_addr_state,
	account_addr_country,
	account_addr_postal,
	account_addr_phone,
	member_year,
	member_prev_club,
	member_show_addr,
	member_show_phone,
	newsletter_recipient,
	sms_recipient
) {
	const requestOptions = {
		url: `${API}/accounts/editbymember`,
		method: 'POST',
		data: {
			account_email,
			member_firstname,
			member_lastname,
			account_addr_street,
			account_addr_street_ext,
			account_addr_city,
			account_addr_state,
			account_addr_country,
			account_addr_postal,
			account_addr_phone,
			member_year,
			member_prev_club,
			member_show_addr,
			member_show_phone,
			newsletter_recipient,
			sms_recipient,

			id,
		},
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function editOne(
	account_email,
	account_remind,
	member_firstname,
	member_lastname,
	member_year,
	member_nickname,
	member_position,
	member_prev_club,
	account_addr_street,
	account_addr_street_ext,
	account_addr_city,
	account_addr_state,
	account_addr_country,
	account_addr_postal,
	account_addr_phone,
	member_show_addr,
	member_show_phone,
	newsletter_recipient,
	mail_recipient,
	sms_recipient,
	member_pic_path,
	member_wall_of_fame_year,

	member_type_id,
	member_type2_id,
	member_admin_type_id,
	member_admin_type2_id,

	id
) {
	const requestOptions = {
		url: `${API}/accounts/edit`,
		method: 'POST',
		headers: authHeader(),
		data: {
			account_email,
			account_remind,
			member_firstname,
			member_lastname,
			member_year,
			member_nickname,
			member_position,
			member_prev_club,
			account_addr_street,
			account_addr_street_ext,
			account_addr_city,
			account_addr_state,
			account_addr_country,
			account_addr_postal,
			account_addr_phone,
			member_show_addr,
			member_show_phone,
			newsletter_recipient,
			mail_recipient,
			sms_recipient,
			member_pic_path,
			member_wall_of_fame_year,

			member_type_id,
			member_type2_id,
			member_admin_type_id,
			member_admin_type2_id,

			id,
		},
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getAll() {
	const requestOptions = {
		url: `${API}/accounts`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getMembersOfType(member_type_id) {
	const requestOptions = {
		url: `${API}/accounts/type/${member_type_id}`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getMemberTypes() {
	const requestOptions = {
		url: `${API}/accounts/membertypes`,
		method: 'GET',
		headers: authHeader(),
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getMemberAdminTypes() {
	const requestOptions = {
		url: `${API}/accounts/memberadmintypes`,
		method: 'GET',
		headers: authHeader(),
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}
function lookupByEmail(email) {
	const requestOptions = {
		url: `${API}/accounts/email/${email}`,
		headers: authHeader(),
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

// NO Authorization Required

function getOne(id) {
	const requestOptions = {
		url: `${API}/accounts/` + id,
		headers: { 'Cache-Control': 'no-store' },
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getAllPublic() {
	const requestOptions = {
		url: `${API}/accounts/public`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getOfficers() {
	const requestOptions = {
		url: `${API}/accounts/officers`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}
function getRecentUpdates() {
	const requestOptions = {
		url: `${API}/accounts/recent`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getWof() {
	const requestOptions = {
		url: `${API}/accounts/wof`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}
