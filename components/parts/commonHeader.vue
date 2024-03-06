<template>
	<div class="commonheader">
		<div class="row">
			<div class="col-sm-12">
				<div class="header text-center m-2">{{ title }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CommonHeader',
	props: {
		title: { type: String, default: '', required: true }
	},
}
</script>
