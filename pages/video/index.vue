<template>
	<div>
		<common-header title="Videos" />
		<span v-if="error" class="text-danger">ERROR: {{ error }}</span>
		<loading v-if="!data" />
		<div v-else>
			<!-- video list -->
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
									showModal('modal-1')
								"
							>
								{{ $moment(item.video_event_dt).format('MMM DD YYYY') }} -
								<span class="sub-headline">{{ item.video_title }}</span>
								<br />
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.video_synop }}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!-- modal -->
		<b-modal
			id="modal-1"
			size="xl"
			centered
			hide-footer
			:title="item.video_title"
		>
			<div>
				<div class="embed-responsive embed-responsive-16by9">
					<youtube
						:player-vars="{ autoplay: 1 }"
						:video-id="video_url"
					></youtube>
				</div>
			</div>
		</b-modal>
	</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getIdFromURL } from 'vue-youtube-embed'
import loading from '@/components/parts/loading'
import CommonHeader from '@/components/parts/commonHeader'
import { videoService } from '@/services/'

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
			videoService.getAll().then(
				(data) => {
					this.data = data
				},
				(error) => {
					this.error = error
				}
			)
		},
		getOne(id) {
			videoService.getOne(id).then(
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
			this.video_title = item.video_title
			this.video_url = item.video_url
			*/
			this.video_url = getIdFromURL(item.video_url)
		},
		showModal(id) {
			this.$bvModal.show(id)
		},
	},
	head() {
		return {
			title: 'Videos',
		}
	},
}
</script>

<style lang="scss" scoped></style>
