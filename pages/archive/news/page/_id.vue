/* eslint-disable vue/no-v-html */
<template>
	<div id="page">
		<h1 class="subheader">{{ title }}</h1>
		<p><span v-html="article"></span></p>
	</div>
</template>

<script>
import { newsService } from '@/services/'

export default {
	layout: 'default',
	data() {
		return {
			id: this.$route.params.id,
			title: '',
			synop: '',
			article: '',
			event_dt: ''
		}
	},
	created() {
		newsService
			.getOne(this.id) // not using the store !
			.then((news) => {
				this.setNewsInfo(news)
			})
	},
	methods: {
		setNewsInfo(u) {
			this.title = u.news_title
			this.synop = u.news_synop
			this.article = u.news_article
			this.event_dt = u.news_event_dt
		}
	}
}
</script>
