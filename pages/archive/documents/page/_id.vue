<template>
	<div id="page">
		<common-header title="archive_title" />

		<div class="row">
			<div class="col-sm-4">
				<div style="background-color:gray;padding:0.5rem">
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
					<span style="color:white"> Page {{ page }} of {{ numPages }}</span>
				</div>
			</div>
		</div>
		<pdf
			:src="item.archive_filepath"
			:page="page"
			@num-pages="numPages = $event"
		></pdf>
	</div>
</template>

<script>
import pdf from 'vue-pdf'
import CommonHeader from '@/components/parts/commonHeader'
import { archiveService } from '@/services/'

export default {
	components: {
		CommonHeader,
		pdf
	},
	layout: 'default',
	data() {
		return {
			id: this.$route.params.id,
			numPages: 0,
			page: 1,
			currentPage: 0,
			item: {}
		}
	},
	created() {
		this.getOne(this.id)
	},
	methods: {
		getOne(id) {
			archiveService.getOne(id).then(
				(data) => {
					this.item = data
				},
				(error) => {
					this.error = error
				}
			)
		}
	},
	head() {
		return {
			title: 'Archived Document'
		}
	}
}
</script>
