<template>
	<div>
		<common-header title="Virtual Clubhouse" />

		<div class="bg">
			<div class="d-flex flex-wrap align-self-start justify-content-between">
				<div class="door">
					<h3>Trophy Room</h3>
					<nuxt-link :to="`/clubhouse/trophy`">
						<a>
							<img
								class="img-fluid"
								src="/_img/_backgrounds/wood-door-1-500x500.png"
							/>
						</a>
					</nuxt-link>
				</div>

				<div class="door">
					<h3>Plaques Room</h3>
					<nuxt-link :to="'/clubhouse/plaque'"
						><a>
							<img
								class="img-fluid"
								src="/_img/_backgrounds/wood-door-1-500x500.png"
						/></a>
					</nuxt-link>
				</div>

				<div class="door">
					<h3>Jerseys Room</h3>
					<nuxt-link :to="'/clubhouse/jersey'"
						><a>
							<img
								class="img-fluid"
								src="/_img/_backgrounds/wood-door-1-500x500.png"
						/></a>
					</nuxt-link>
				</div>

				<div class="door">
					<h3>Balls Room</h3>
					<nuxt-link :to="'/clubhouse/ball'"
						><a>
							<img
								class="img-fluid"
								src="/_img/_backgrounds/wood-door-1-500x500.png"
						/></a>
					</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CommonHeader from '@/components/parts/commonHeader'

export default {
	components: {
		CommonHeader
	},
	head() {
		return {
			title: 'Virtual Clubhouse'
		}
	}
}
</script>

<style lang="scss" scoped>
.bg {
	background-image: url('/_img/_backgrounds/wood_clubhouse.jpg');
	/* Center and scale the image nicely */
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	padding: 2em;
	padding-bottom: 5em;
}
.door {
	width: 160px;
	margin-right: 2rem;
	font-size: 1em;
	text-align: center;
	color: white;
}
</style>
