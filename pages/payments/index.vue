/* eslint-disable vue/no-v-html */
<template>
	<div>
		<common-header title="Payments" />
		<span v-if="error" class="text-danger">ERROR: {{ error }}</span>
		<loading v-if="!data" />
		<div v-else>
			<div class="news-frame">
				<div v-for="item in data" :key="item.id" class="card my-card">
					<span class="sub-headline">{{ item.payment_title }}</span>
					<br />
					<p v-html="item.payment_paypal_button"></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import loading from '@/components/parts/loading'
import CommonHeader from '@/components/parts/commonHeader'
import { paymentsService } from '@/services/'

export default {
	components: {
		CommonHeader,
		loading,
	},
	data() {
		return {
			item: {},
			data: [],
			error: '',
		}
	},
	created() {
		this.getCurrent()
	},
	methods: {
		getCurrent() {
			paymentsService.getCurrent().then(
				(data) => {
					this.data = data
				},
				(error) => {
					this.error = error
				}
			)
		},
	},
	head() {
		return {
			title: 'Payments',
		}
	},
}
</script>

<style lang="scss" scoped>
.my-card {
	background-color: #eee;
	margin: 1rem;
	padding: 1rem;
	display: inline-block;
	max-width: 30rem;
}
</style>
