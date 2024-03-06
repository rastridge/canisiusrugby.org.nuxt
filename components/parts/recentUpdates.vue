<template>
	<div>
		<h4>Recent Updates</h4>
		<div class="table-responsive">
			<table class="table table-sm">
				<tbody>
					<tr v-for="item in accounts" :key="item.account_id">
						<td>{{ item.name }}</td>
						<td>{{ $moment(item.modified_dt).format('MMM D YYYY h:mm a') }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import { accountService } from '@/services/'
export default {
	name: 'RecentUpdates',
	data() {
		return {
			accounts: null
		}
	},
	created() {
		this.getRecentUpdates()
	},
	methods: {
		getRecentUpdates() {
			accountService.getRecentUpdates().then(
				(data) => {
					this.accounts = data
				},
				(error) => {
					this.error = error
				}
			)
		}
	}
}
</script>
