/* eslint-disable vue/no-v-html */
<template>
	<div>
		<common-header title="Newsletter Archive" />
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
									selectItem(item.id)
									showModal('my-modal')
								"
							>
								{{ $moment(item.dt).format('YYYY MMM DD') }} -
								<span class="sub-headline">{{ item.title }}</span> &nbsp;&nbsp;
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
				<h5>{{ item.newsletter_subject }}</h5>
				<div class="w-50">
					<b-button
						variant="primary"
						size="sm"
						class="float-right"
						@click="hideModal('my-modal')"
					>
						Return to Newsletters
					</b-button>
				</div>
			</template>
			<div class="card my-card">
				<h4>{{ $moment(item.newsletter_sent).format('MMM DD YYYY') }}</h4>
				<p v-html="item.newsletter_body_html"></p>
			</div>
			<template v-slot:modal-footer>
				<div class="w-100">
					<b-button
						variant="primary"
						size="sm"
						class="float-left"
						@click="$bvModal.hide('my-modal')"
					>
						Return to Newsletters
					</b-button>
				</div>
			</template>
		</b-modal>
	</div>
</template>

<script>
import CommonHeader from '@/components/parts/commonHeader'
import loading from '@/components/parts/loading'
import { newsletterService } from '@/services/'

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
			newsletterService.getAll().then(
				(data) => {
					this.data = data
				},
				(error) => {
					this.error = error
				}
			)
		},
		getOne(id) {
			newsletterService.getOne(id).then(
				(data) => {
					this.item = data
				},
				(error) => {
					this.error = error
				}
			)
		},
		selectItem(id) {
			this.getOne(id)
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
			title: 'Newsletters Archive',
		}
	},
}
</script>
