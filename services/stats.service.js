import Axios from 'axios'
import { handleSuccess, handleError, authHeader } from '@/helpers'
import { API } from '@/config.json'

export const statsService = {
	getAll,
	getYear,
	getAllCurrent,
	getPlayerStats,
	playerGamesPlayed,
	getTeamStats,
	getTeamStatsTotal,
	getPreviousGames,
	getGameTypes,
	getOne,
	getAdjacent,
	editOne,
	addOne,
	deleteOne,
	changeStatus,
	getPlayers, // from a game
}

// NO Authorization Required

function getAll() {
	const requestOptions = {
		url: `${API}/statss`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getYear(yr) {
	const requestOptions = {
		url: `${API}/statss/year/${yr}`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getGameTypes() {
	const requestOptions = {
		url: `${API}/statss/gametypes`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getAllCurrent() {
	const requestOptions = {
		url: `${API}/statss/current`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getOne(id) {
	const requestOptions = {
		url: `${API}/statss/` + id,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getPlayers(id) {
	const requestOptions = {
		url: `${API}/statss/players/` + id,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getPlayerStats(id) {
	const requestOptions = {
		url: `${API}/statss/playerstats/` + id,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function playerGamesPlayed(id) {
	const requestOptions = {
		url: `${API}/statss/playergames/` + id,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getTeamStats() {
	const requestOptions = {
		url: `${API}/statss/teamstats`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getTeamStatsTotal() {
	const requestOptions = {
		url: `${API}/statss/teamstatstotal`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getPreviousGames(id) {
	const requestOptions = {
		url: `${API}/statss/previous/` + id,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function getAdjacent(direction) {
	const requestOptions = {
		url: `${API}/statss/adjacent/${direction}`,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

// YES Authorization Required

function addOne(
	opponent,
	referee,
	venue,
	comment,
	date,
	KO_time,
	game_type_id,
	game_level,
	ptsFor,
	ptsAgn,
	game_image,
	players
) {
	const requestOptions = {
		url: `${API}/statss/add`,
		method: 'POST',
		headers: authHeader(),
		data: {
			opponent,
			referee,
			venue,
			comment,
			date,
			KO_time,
			game_type_id,
			game_level,
			ptsFor,
			ptsAgn,
			game_image,
			players,
		},
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function editOne(
	id,
	opponent,
	referee,
	venue,
	comment,
	date,
	KO_time,
	game_type_id,
	game_level,
	ptsFor,
	ptsAgn,
	game_image,
	players
) {
	const requestOptions = {
		url: `${API}/statss/edit`,
		method: 'POST',
		headers: authHeader(),
		data: {
			id,
			opponent,
			referee,
			venue,
			comment,
			date,
			KO_time,
			game_type_id,
			game_level,
			ptsFor,
			ptsAgn,
			game_image,
			players,
		},
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function deleteOne(id) {
	const requestOptions = {
		url: `${API}/statss/delete/` + id,
		method: 'GET',
		headers: authHeader(),
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}

function changeStatus(id, status) {
	const requestOptions = {
		url: `${API}/statss/status`,
		method: 'POST',
		headers: authHeader(),
		data: { id, status },
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
}
