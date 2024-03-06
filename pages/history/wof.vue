<template>
	<div>
		<common-header title="Wall of Fame" />
		<span v-if="error" class="text-danger">ERROR: {{ error }}</span>
		<loading v-if="!data" />
		<div v-else>
			<div v-for="item in data" :key="item.id" class="card wof-card">
				<div class="card-header">{{ item.member_wall_of_fame_year }}</div>
				<div class="card-body">
					<img class="wof-img" :src="item.member_pic_path" />
				</div>
				<div class="card-footer">{{ item.name }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import CommonHeader from '@/components/parts/commonHeader'
import loading from '@/components/parts/loading'
import { accountService } from '@/services/'
export default {
	components: {
		CommonHeader,
		loading,
	},
	data() {
		return {
			data: null,
			error: '',
		}
	},
	created() {
		this.getWof()
	},
	methods: {
		getWof() {
			accountService.getWof().then(
				(data) => {
					this.data = data
				},
				(error) => {
					this.error = error
				}
			)
		}
	},
	head() {
		return {
			title: 'Wall of Fame',
		}
	},
}
</script>
<style lang="scss" scoped>
.wof-card {
	text-align: center;
	width: 160px;
	display: inline-block;
	margin: 1rem;
	background: #b6b6b6;
	-webkit-box-shadow: 4px 3px 13px 0px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: 4px 3px 13px 0px rgba(0, 0, 0, 0.75);
	box-shadow: 4px 3px 13px 0px rgba(0, 0, 0, 0.75);
}
.wof-img {
	height: 72px;
	width: 72px;
	border: solid thick white;
}
</style>
