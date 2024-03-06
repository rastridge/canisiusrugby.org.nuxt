<template>
	<div id="auto">
		<div class="autocomplete">
			<input
				v-model="search"
				type="text"
				@input="onChange"
				@keyup.down="onArrowDown"
				@keyup.up="onArrowUp"
				@keyup.enter="onEnter"
			/>
			<ul
				v-show="isOpen"
				id="autocomplete-results"
				class="autocomplete-results"
			>
				<li v-if="isLoading" class="loading">Loading results...</li>
				<li
					v-for="(result, i) in results"
					v-else
					:key="i"
					class="autocomplete-result"
					:class="[
						{ 'is-active': i === arrowCounter },
						{ 'autocomplete-result-dark': dark },
					]"
					@click="setResult(result)"
				>
					{{ result.member_lastname }}, {{ result.member_firstname }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AutoComplete',
	props: {
		items: {
			type: Array,
			required: false,
			default: () => [],
		},
		isAsync: {
			type: Boolean,
			required: false,
			default: false,
		},
		dark: {
			type: Boolean,
			required: false,
			default: false,
		},
		init: {
			type: String,
			required: false,
			default: '',
		},
	},

	data() {
		return {
			isOpen: false,
			results: [],
			search: this.init.length > 2 ? this.init : '',
			isLoading: false,
			arrowCounter: 0,
		}
	},
	watch: {
		items(val, oldValue) {
			// actually compare them
			if (val.length !== oldValue.length) {
				this.results = val
				this.isLoading = false
			}
		},
		init(val) {
			this.search = val
		},
		search(val) {
			if (!val.length) {
				this.$emit('setId', 0)
			}
		},
	},
	mounted() {
		document.addEventListener('click', this.handleClickOutside)
	},
	destroyed() {
		document.removeEventListener('click', this.handleClickOutside)
	},
	methods: {
		onChange() {
			// Let's warn the parent that a change was made
			this.$emit('input', this.search)

			// Is the data given by an outside ajax request?
			if (this.isAsync) {
				this.isLoading = true
			} else {
				// Let's search our flat array
				this.filterResults()
				this.isOpen = true
			}
		},
		filterResults() {
			// first uncapitalize all the things
			this.results = this.items.filter((item) => {
				return item.member_lastname
					.toLowerCase()
					.startsWith(this.search.toLowerCase())
			})
		},
		setResult(result) {
			this.search = result.member_lastname + ', ' + result.member_firstname
			this.isOpen = false
			this.$emit('setId', result.id)
		},
		onArrowDown(evt) {
			if (this.arrowCounter < this.results.length) {
				this.arrowCounter = this.arrowCounter + 1
			}
		},
		onArrowUp() {
			if (this.arrowCounter > 0) {
				this.arrowCounter = this.arrowCounter - 1
			}
		},
		onEnter() {
			this.search = this.results[this.arrowCounter]
			this.isOpen = false
			this.arrowCounter = -1
		},
		handleClickOutside(evt) {
			if (!this.$el.contains(evt.target)) {
				this.isOpen = false
				this.arrowCounter = -1
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.autocomplete-results {
	padding: 0;
	margin: 0;
	border: 1px solid #cccccc;
	height: 120px;
	overflow: auto;
	width: 100%;
}

.autocomplete-result,
.autocomplete-result-dark {
	list-style: none;
	text-align: left;
	padding: 4px 2px;
	cursor: pointer;
	color: rgb(0, 0, 0);
}
.autocomplete-result-dark {
	color: rgb(255, 255, 255);
}

.autocomplete-result:hover {
	background-color: gray;
	color: white;
}
</style>
