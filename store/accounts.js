export const state = () => ({
	type: null,
	alpha: null,
	data: null
})

export const mutations = {
	savetype(state, type) {
		state.type = type
	},
	cleartype(state) {
		state.type = null
	},
	savealpha(state, alpha) {
		state.alpha = alpha
	},
	clearalpha(state) {
		state.alpha = null
	},
	savedata(state, data) {
		state.data = data
	},
	cleardata(state) {
		state.data = null
	}
}
