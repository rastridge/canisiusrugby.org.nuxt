<template>
	<div>
		<common-header title="Sponsors" />
		<span v-if="error" class="text-danger">ERROR: {{ error }}</span>
		<loading v-if="!data" />
		<div v-else>
			<!-- sponsor list -->
			<div class="row">
				<div class="col-sm-12">
					<jw-pagination
						style="margin: 1em"
						class="paging text-center"
						:items="data"
						:page-size="20"
						@changePage="onChangePage"
					></jw-pagination>

					<p class="sub-headline">Click on the ad for complete information</p>
					<div class="news-frame">
						<ul class="list-group">
							<li
								v-for="item in pageOfData"
								:key="item.id"
								class="list-group-item list-group-item-action"
								href="#"
								@click.prevent="selectItem(item)"
							>
								<span class="sub-headline"
									>{{ item.ad_client_contact }} {{ item.ad_client_name }}</span
								>
								<br />
								<img :src="item.ad_image_path" width="100%" />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<!-- modal -->
		<b-modal
			id="modal-1"
			size="sm"
			centered
			hide-footer
			:title="item.ad_client_name"
		>
			<div>
				<p>{{ item.ad_client_contact }}</p>
				<p>{{ item.ad_client_email }}</p>
				<p>{{ item.ad_client_phone }}</p>
				<p>
					<a :href="item.ad_client_website">{{ item.ad_client_website }}</a>
				</p>
			</div>
		</b-modal>
	</div>
</template>

<script>
import loading from '@/components/parts/loading'
import CommonHeader from '@/components/parts/commonHeader'
import { sponsorService } from '@/services/'

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
		this.getAllCurrent()
	},
	methods: {
		onChangePage(pageOfItems) {
			this.pageOfData = pageOfItems
		},
		getAllCurrent() {
			sponsorService.getAllCurrent().then(
				(data) => {
					this.data = data
				},
				(error) => {
					this.error = error
				}
			)
		},
		getOne(id) {
			sponsorService.getOne(id).then(
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
			this.showModal('modal-1')
		},
		showModal(id) {
			this.$bvModal.show(id)
		},
	},
	head() {
		return {
			title: 'Sponsors',
		}
	},
}
</script>

<style lang="scss" scoped></style>
