/* eslint-disable vue/no-v-html */
<template>
	<div>
		<common-header title="News Archive" />
		<span v-if="error" class="text-danger">ERROR: {{ error }}</span>
		<loading v-if="!data" />
		<div v-else>
			<!-- Archive list -->
			<div class="row">
				<div class="col-sm-12">
					<jw-pagination
						style="margin: 1em"
						class="paging text-center"
						:items="data"
						:page-size="20"
						@changePage="onChangePage"
					></jw-pagination>

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
								{{ $moment(item.dt).format('YYYY MMM DD') }} -
								<span class="sub-headline">{{ item.title }}</span>
								<br />
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.news_synop }} &nbsp;&nbsp;
								<span style="font-size: 7px">{{ item.id }}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<!-- modal -->
		<b-modal id="my-modal" size="xl" centered>
			<template v-slot:modal-header>
				<h5>{{ item.news_title }}</h5>
				<div class="w-50">
					<b-button
						variant="primary"
						size="sm"
						class="float-right"
						@click="hideModal('my-modal')"
					>
						Return to News
					</b-button>
				</div>
			</template>
			<div class="card border-0">
				<h4>
					{{ $moment(item.news_dt).format('MMM DD YYYY') }} -
					{{ item.news_synop }}
				</h4>
				<p v-html="item.news_article"></p>
			</div>
			<template v-slot:modal-footer>
				<div class="w-100">
					<b-button
						variant="primary"
						size="sm"
						class="float-left"
						@click="$bvModal.hide('my-modal')"
					>
						Return to News
					</b-button>
				</div>
			</template>
		</b-modal>
	</div>
</template>

<script>
import loading from '@/components/parts/loading'
import CommonHeader from '@/components/parts/commonHeader'
import { newsService } from '@/services/'

export default {
	components: {
		CommonHeader,
		loading,
	},
	data() {
		return {
			item: {},
			data: null,
			pageOfData: [],
			error: '',
		}
	},
	created() {
		this.getAll()
	},
	methods: {
		onChangePage(pageOfItems) {
			this.pageOfData = pageOfItems
		},
		getAll() {
			newsService.getAll().then(
				(data) => {
					this.data = data
				},
				(error) => {
					this.error = error
				}
			)
		},
		getOne(id) {
			newsService.getOne(id).then(
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
			/*
			this.title = item.title
			this.dt = item.dt
			this.synop = item.synop
			this.article = item.article
			*/
		},
		hideModal(id) {
			this.$bvModal.hide(id)
		},
		showModal(id) {
			this.$bvModal.show(id)
		},
	},
	head() {
		return {
			title: 'News Archive',
		}
	},
}
</script>

<style lang="scss" scoped>
.my-card {
	border: none;
}
</style>
