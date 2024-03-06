<template>
	<div>
		<span v-if="!hover" style="color: #00c" @mouseover="hover = true"
			>Send Email</span
		>
		<span v-if="hover" @mouseleave="hover = false"
			><a :href="'mailto:' + email">{{ email }}</a></span
		>
	</div>
</template>

<script>
export default {
	name: 'ExposeEmail',
	props: {
		email: { type: String, default: '', required: true },
	},
	data() {
		return {
			hover: false,
		}
	},
}
</script>
