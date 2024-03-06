<template>
	<div>
		<commonheader title="Player Stats - Fifteens"></commonheader>
		<span v-if="error" class="text-danger">ERROR: {{ error }}</span>
		<loading v-if="!data" />
		<div v-else>
			<div class="row">
				<div class="col-sm-12">
					<!-- User Interface controls -->
					<b-row>
						<b-col lg="6" class="my-1">
							<b-form-group
								label="Filter On"
								label-cols-sm="3"
								label-align-sm="right"
								label-size="sm"
								description="Leave all unchecked to filter on all data"
								class="mb-0"
							>
								<b-form-checkbox-group v-model="filterOn" class="mt-1">
									<b-form-checkbox value="name">Name</b-form-checkbox>
									<b-form-checkbox value="year">Joined</b-form-checkbox>
									<b-form-checkbox value="isactive">Status</b-form-checkbox>
								</b-form-checkbox-group>
							</b-form-group>
						</b-col>

						<b-col lg="6" class="my-1">
							<b-form-group
								label="Filter"
								label-cols-sm="3"
								label-align-sm="right"
								label-size="sm"
								label-for="filterInput"
								class="mb-0"
							>
								<b-input-group size="sm">
									<b-form-input
										id="filterInput"
										v-model="filter"
										type="search"
										placeholder="Type to Search"
									></b-form-input>
									<b-input-group-append>
										<b-button :disabled="!filter" @click="filter = ''"
											>Clear</b-button
										>
									</b-input-group-append>
								</b-input-group>
							</b-form-group>
						</b-col>

						<b-col sm="5" md="6" class="my-1">
							<b-form-group
								label="Per page"
								label-cols-sm="6"
								label-cols-md="4"
								label-cols-lg="3"
								label-align-sm="right"
								label-size="sm"
								label-for="perPageSelect"
								class="mb-0"
							>
								<b-form-select
									id="perPageSelect"
									v-model="perPage"
									size="sm"
									:options="pageOptions"
								></b-form-select>
							</b-form-group>
						</b-col>

						<b-col sm="7" md="6" class="my-1">
							<b-pagination
								v-model="currentPage"
								:total-rows="totalRows"
								:per-page="perPage"
								align="fill"
								size="sm"
								class="my-0"
							></b-pagination>
						</b-col>
					</b-row>
					<div class="news-frame">
						<!-- Main table element -->
						<b-table
							show-empty
							small
							responsive
							class="text-nowrap"
							:items="data"
							:fields="fields"
							:current-page="currentPage"
							:per-page="perPage"
							:filter="filter"
							:filter-included-fields="filterOn"
							:sort-by.sync="sortBy"
							:sort-desc.sync="sortDesc"
							:sort-direction="sortDirection"
							@filtered="onFiltered"
						>
							<template v-slot:cell(actions)="row">
								<b-button
									size="sm"
									class="mr-1"
									@click="info(row.item, row.index, $event.target)"
								>
									Info modal
								</b-button>
								<b-button size="sm" @click="row.toggleDetails">
									{{ row.detailsShowing ? 'Hide' : 'Show' }} Details
								</b-button>
							</template>

							<template v-slot:row-details="row">
								<b-card>
									<ul>
										<li v-for="(value, key) in row.item" :key="key">
											{{ key }}: {{ value }}
										</li>
									</ul>
								</b-card>
							</template>
						</b-table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { statsService } from '@/services'
import loading from '@/components/parts/loading'
import commonheader from '@/components/parts/commonHeader'

export default {
	components: {
		commonheader,
		loading,
	},
	data() {
		return {
			data: null,
			fields: [
				{
					key: 'name',
					label: 'Player',
					sortable: true,
					sortDirection: 'desc',
				},
				{
					key: 'games',
					label: 'Games',
					sortable: true,
					class: 'text-center',
				},
				{
					key: 'isactive',
					label: 'Status',
					formatter: (value, key, item) => {
						return value ? 'Active' : 'Alum'
					},
					sortable: true,
					sortByFormatted: true,
					filterByFormatted: true,
				},
				{
					key: 'year',
					label: 'Joined',
					sortable: true,
				},
				{
					key: 'tries',
					label: 'Tries',
					sortable: true,
				},
				{
					key: 'conv',
					label: 'Conv',
					sortable: true,
				},
				{
					key: 'pk',
					label: 'PK',
					sortable: true,
				},
				{
					key: 'dg',
					label: 'DG',
					sortable: true,
				},
				{
					key: 'yellow',
					label: 'YEL',
					sortable: true,
				},
				{
					key: 'red',
					label: 'RED',
					sortable: true,
				},
				{
					key: 'pts',
					label: 'PTS',
					sortable: true,
				},
				{
					key: 'tpg',
					label: 'TPG',
					sortable: true,
				},
			],
			currentPage: 1,
			perPage: 10,
			pageOptions: [10, 15, 20],
			sortBy: '',
			sortDesc: false,
			sortDirection: 'asc',
			filter: null,
			filterOn: [],
			totalRows: 0,
			error: '',
		}
	},
	computed: {
		sortOptions() {
			// Create an options list from our fields
			return this.fields
				.filter((f) => f.sortable)
				.map((f) => {
					return { text: f.label, value: f.key }
				})
		},
	},
	created() {
		this.getPlayerStats(1)
	},
	methods: {
		getPlayerStats(id) {
			statsService.getPlayerStats(id).then((stats) => {
				this.data = stats
				this.totalRows = stats.length
			})
		},
		onFiltered(filteredItems) {
			// Trigger pagination to update the number of buttons/pages due to filtering
			this.totalRows = filteredItems.length
			this.currentPage = 1
		},
	},
	head() {
		return {
			title: '15s Player Statistics',
		}
	},
}
</script>

<style lang="scss" scoped>
.frame {
	padding: 1rem;
	margin-top: 1rem;
	background-color: rgb(255, 255, 255);
}
</style>
