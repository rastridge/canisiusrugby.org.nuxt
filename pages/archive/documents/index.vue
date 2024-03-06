<template>
	<div>
		<common-header title="Document Archive" />
		<span v-if="error" class="text-danger">ERROR: {{ error }}</span>
		<loading v-if="!data" />
		<div v-else>
			<div class="row justify-content-center">
				<div class="col-4">
					<div class="form-group text-center">
						<b-form-select
							v-model="year"
							:options="years"
							class="mb-3"
							value-field="yr"
							text-field="yr"
							disabled-field="notEnabled"
						></b-form-select>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-12">
					<!-- Archive list -->
					<jw-pagination
						style="margin: 1em"
						class="paging text-center"
						:items="filteredData"
						:page-size="20"
						@changePage="onChangePage"
					></jw-pagination>
				</div>
			</div>

			<div class="news-frame">
				<ul class="list-group">
					<li
						v-for="item in pageOfData"
						:key="item.id"
						class="list-group-item list-group-item-action"
						href="#"
						@click.prevent="
							selectItem(item)
							showModal('my-modal')
						"
					>
						<span class="subsubheader"> {{ item.archive_title }} - </span>
						<span class="subheader" style="color: #00f">
							{{ item.archive_description }} &nbsp;&nbsp;
						</span>
						<span style="font-size: 8px; color: #bbbbbb">{{ item.id }}</span>
					</li>
				</ul>
			</div>
		</div>
		<!-- modal -->
		<b-modal id="my-modal" size="xl" centered hide-footer>
			<template v-slot:modal-header>
				<h5>{{ item.archive_title }}</h5>
				<div class="w-50">
					<b-button
						variant="primary"
						size="sm"
						class="float-right"
						@click="hideModal('my-modal')"
					>
						Return to Documents
					</b-button>
				</div>
			</template>
			<div class="row">
				<div class="col-sm-4">
					<div style="background-color: gray; padding: 0.5rem">
						<b-form-input
							v-model.number="page"
							type="range"
							min="1"
							:max="numPages"
							step="1"
							size="lg"
							autofocus
						>
						</b-form-input>
						<span style="color: white"> Page {{ page }} of {{ numPages }}</span>
					</div>
				</div>
			</div>
			<pdf
				:src="item.archive_filepath"
				:page="page"
				@num-pages="numPages = $event"
			></pdf>
		</b-modal>
	</div>
</template>

<script>
import pdf from 'vue-pdf'
import moment from 'moment'
import loading from '@/components/parts/loading'
import CommonHeader from '@/components/parts/commonHeader'
import { archiveService } from '@/services/'

export default {
	components: {
		CommonHeader,
		pdf,
		loading,
	},
	data() {
		return {
			numPages: 0,
			page: 1,
			currentPage: 0,
			item: {},
			data: null,
			pageOfData: [],
			startyear: 1987,
			year: parseInt(moment().format('YYYY')),
			years: [],
			error: '',
		}
	},
	computed: {
		filteredData() {
			return this.data.filter(function (d) {
				return parseInt(d.archive_date) === this.year
			}, this)
		},
	},
	created() {
		this.getAll()
		this.createYears()
	},
	methods: {
		createYears() {
			const years = []
			for (let year = this.startyear; year <= this.year; year++) {
				years.push(year)
			}
			this.years = years
		},
		onChangePage(pageOfItems) {
			this.pageOfData = pageOfItems
		},
		getAll() {
			archiveService.getAll().then(
				(data) => {
					this.data = data
				},
				(error) => {
					this.error = error
				}
			)
		},
		getOne(id) {
			archiveService.getOne(id).then(
				(data) => {
					this.item = data
				},
				(error) => {
					this.error = error
				}
			)
		},
		selectItem(item) {
			this.getOne(item.id)
		},
		showModal(id) {
			this.$bvModal.show(id)
		},
		hideModal(id) {
			this.$bvModal.hide(id)
		},
	},
	head() {
		return {
			title: 'Documents Archive',
		}
	},
}
</script>

<style lang="scss" scoped></style>
