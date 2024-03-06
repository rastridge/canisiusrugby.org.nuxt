export const state = () => ({
	year: null,
	data: null
})

export const mutations = {
	saveyear(state, year) {
		state.year = year
	},
	clearyear(state) {
		state.year = null
	},
	savedata(state, data) {
		state.data = data
	},
	cleardata(state) {
		state.data = null
	}
}
