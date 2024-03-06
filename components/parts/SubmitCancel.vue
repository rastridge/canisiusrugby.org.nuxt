<template>
	<div class="submitcancel">
		<div class="btn-group" role="group" aria-label="SubmitCancel">
			<button
				type="submit"
				class="btn btn-primary"
				:disabled="submitstatus === 'PENDING'"
				@click.prevent="dispose('submit')"
			>
				Submit
			</button>
			&nbsp;
			<button class="btn btn-secondary" @click.prevent="dispose('cancel')">
				Cancel
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SubmitCancel',
	props: {
		submitstatus: { type: String, required: true }
	},
	computed: {
		user() {
			return this.$store.state.authentication.user
		},
		perm() {
			return this.$store.state.authentication.user.admin_user_perm
		},
		routePath() {
			return this.$route.path
		}
	},
	methods: {
		dispose(e) {
			this.$emit('dispose', e)
		}
	}
}
</script>
