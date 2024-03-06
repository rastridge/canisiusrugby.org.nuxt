/* eslint-disable vue/no-v-html */
<template>
	<div id="page">
		<h1 class="subheader">{{ subject }}</h1>
		<p><span v-html="body_html"></span></p>
	</div>
</template>

<script>
import { newsletterService } from '@/services/'

export default {
	layout: 'default',
	data() {
		return {
			id: this.$route.params.id,
			subject: '',
			body_html: ''
		}
	},
	created() {
		newsletterService
			.getOne(this.id) // not using the store !
			.then((newsletter) => {
				this.setNewsletterInfo(newsletter)
			})
	},
	methods: {
		setNewsletterInfo(u) {
			this.subject = u.newsletter_subject
			this.body_html = u.newsletter_body_html
		}
	},
	head() {
		return {
			title: 'Newsletters'
		}
	}
}
</script>
