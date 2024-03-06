<template>
	<div class="adminheader">
		<div class="row">
			<div class="col-sm-12">
				<p class="headline">{{ title }}</p>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<user-logged-in />
			</div>
		</div>
	</div>
</template>

<script>
import UserLoggedIn from '@/components/parts/UserLoggedIn'

export default {
	name: 'AdminHeader',
	components: {
		UserLoggedIn,
	},
	props: {
		title: { type: String, default: '', required: true },
	},
}
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/admin.scss';
</style>
