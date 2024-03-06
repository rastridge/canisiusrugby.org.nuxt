<template>
	<div class="userloggedin">
		<h3 class="sub-headline">Logged in as {{ user.admin_user_name }}</h3>
	</div>
</template>

<script>
export default {
	name: 'UserLoggedIn',
	computed: {
		user() {
			return this.$store.state.authentication.user
		},
		perm() {
			return this.$store.state.authentication.user.admin_user_perm
		},
		routePath() {
			return this.$route.path
		},
	},
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/admin.scss';
.userloggedin {
	margin-bottom: 1rem;
}
</style>
