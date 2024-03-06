export const state = () => ({
	year: null
})

export const mutations = {
	saveyear(state, year) {
		state.year = year
	},
	clearyear(state) {
		state.year = null
	}
}
