export const state = () => ({
	gametype: null,
	season: null,
})

export const mutations = {
	savegametype(state, type) {
		state.gametype = type
	},
	cleargametype(state) {
		state.gametype = null
	},
	saveseason(state, season) {
		state.season = season
	},
	clearseason(state) {
		state.season = null
	}
}
