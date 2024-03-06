<template>
	<div id="lookup">
		<form class="form-inline">
			<div class="form-group mx-sm-3 mb-2 mt-2">
				<label class="control-label" for="account_email"
					>Look up by Email:&nbsp;
				</label>
				<input
					id="account_email"
					v-model.trim="account_email"
					small
					type="email"
					class="form-control"
				/>
			</div>
			<button
				type="button"
				class="btn btn-primary btn-sm mb-2 mt-2"
				@click="lookupByEmail"
			>
				Submit
			</button>
		</form>
		<div v-show="!emailStatus">
			Account with email
			<span>{{ account_email }}</span> does not exist
		</div>
	</div>
</template>

<script>
import { accountService } from '@/services/'
export default {
	name: 'LookupByEmail',
	data() {
		return {
			account: {},
			account_email: '',
			emailStatus: true,
		}
	},
	methods: {
		lookupByEmail() {
			accountService.lookupByEmail(this.account_email).then(
				(data) => {
					this.account = data
					if (this.account.account_email) {
						this.$router.push(`/admin/accounts/men/${this.account.account_id}`)
					} else {
						this.emailStatus = false
						setTimeout(() => {
							this.emailStatus = true
							this.account_email = ''
						}, 5000)
					}
				},
				(error) => {
					this.error = error
				}
			)
		},
	},
}
</script>

<style lang="scss" scoped>
#lookup {
	height: 6rem;
	color: rgb(202, 202, 202);
}
</style>
