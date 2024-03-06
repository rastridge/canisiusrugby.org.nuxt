/* eslint-disable vue/attribute-hyphenation */
<template>
	<div id="render">
		<div v-if="viewable" class="renderlist">
			<b-button
				v-if="addable"
				size="md"
				variant="primary"
				mt-1
				@click="addItem"
			>
				Add New
			</b-button>

			<div v-if="data.length > 0">
				<div class="row">
					<div class="col-sm-12 col-md-8 text-center">
						<div style="padding: 1rem">
							<jw-pagination
								:items="data"
								:page-size="15"
								@changePage="onChangePage"
							></jw-pagination>
						</div>
					</div>
					<div class="col-sm-12 col-md-4">
						<div style="padding: 1rem">
							<h1 class="sub-header">{{ data.length }} Records</h1>
						</div>
					</div>
				</div>

				<div class="table-responsive table-box">
					<table class="table table-sm text-nowrap lightondark">
						<thead>
							<tr>
								<th v-if="statusable">Status</th>
								<th>Name</th>
								<th>Modified</th>
								<th v-if="editable || deleteable" colspan="2">Actions</th>
							</tr>
						</thead>
						<tbody id="tbl">
							<tr v-for="item in pageOfData" :key="item.id">
								<td v-if="statusable" class="h6">
									<a @click="changeStatus({ id: item.id, status: item.status })"
										><b-icon
											:icon="item.status ? 'shift' : 'arrow-down'"
											:variant="item.status ? 'primary' : 'default'"
										></b-icon>
									</a>
								</td>
								<td>{{ item.title }}</td>
								<td>{{ $moment(item.dt).format('MMM D YYYY h:mm a') }}</td>
								<nuxt-link
									v-if="editable"
									:to="'/admin/' + app + '/' + item.id"
									tag="td"
									><a>
										<b-icon icon="pencil-square"> </b-icon>
									</a>
								</nuxt-link>
								<td v-if="deleteable">
									<a @click="deleteItem(item.id)">
										<b-icon icon="trash"> </b-icon>
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div v-if="data.length < 1">No Records</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		data: { type: Array, required: true },
		app: { type: String, default: '', required: true },
		statusable: { type: Boolean, default: false, required: false },
		editable: { type: Boolean, default: false, required: false },
		deleteable: { type: Boolean, default: false, required: false },
		viewable: { type: Boolean, default: false, required: false },
		addable: { type: Boolean, default: false, required: false },
	},
	data() {
		return {
			pageOfData: [],
			dataLocal: this.data,
		}
	},
	methods: {
		onChangePage(pageOfItems) {
			this.pageOfData = pageOfItems
		},
		addItem() {
			this.$emit('addItem')
		},
		changeStatus({ id, status }) {
			const pos = this.data.findIndex((data) => data.id === id)
			this.data[pos].status = !this.data[pos].status

			// change DB
			this.$emit('changeStatus', { id, status })
		},
		deleteItem(id) {
			if (confirm('Are you sure you want to permanently delete this user?')) {
				this.data = this.data.filter((u) => u.id !== id)
				// change DB
				this.$emit('deleteItem', id)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/admin.scss';
</style>
