/* eslint-disable vue/no-v-html */
<template>
	<div id="page">
		<common-header :title="item.content_name" />
		<br />
		<div v-html="item.content_body"></div>
	</div>
</template>

<script>
import CommonHeader from '@/components/parts/commonHeader'
import { contentService } from '@/services/'
export default {
	components: {
		CommonHeader
	},
	data() {
		return {
			id: this.$route.params.id,
			item: {}
		}
	},
	created() {
		this.getOne(this.id)
	},
	methods: {
		getOne(id) {
			contentService.getOne(id).then(
				(data) => {
					// eslint-disable-next-line no-console
					// console.log('data= ', data)
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
			title: this.item.content_name
		}
	}
}
</script>
<style></style>
