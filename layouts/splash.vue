/* eslint-disable vue/no-unused-vars */
<template>
	<div id="splash">
		<div class="fade-in">
			<a href="#" style="text-decoration: none;" @click.prevent="enterSite">
				<div id="container">
					<div class="row">
						<div class="col-sm-12">
							<div class="text-center">
								<div class="brand">
									BUFFALO
								</div>
								<img
									src="~@/assets/imgs/bflo_blue.png"
									alt="Buffalo Rugby"
									class="bflo-logo"
								/>
								<div class="brand">
									RUGBY
								</div>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-sm-12">
							<div class="address-bar">
								Home Field Delaware Park | Home Base Brawler's Deli
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-12">
							<div style="height:900px">
								<nuxt />
							</div>
						</div>
					</div>
				</div>
			</a>
		</div>
	</div>
</template>

<script>
export default {
	middleware: 'noauth',
	methods: {
		enterSite() {
			this.$router.push('/news')
		}
	},
	head() {
		return {
			title: 'Welcome to the Buffalo Rugby Club'
		}
	}
}
</script>

<style lang="css">
/******************************/
/* intro screen */
/*****************************/

.fade-in {
	background: url('~@/assets/imgs/2019nyrc_scrum.jpg') no-repeat center center
		fixed;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
	-o-background-size: cover;
	-webkit-animation: fadein 6s; /* Safari, Chrome and Opera > 12.1 */
	-moz-animation: fadein 6s; /* Firefox < 16 */
	-ms-animation: fadein 6s; /* Internet Explorer */
	-o-animation: fadein 6s; /* Opera < 12.1 */
	animation: fadein 6s;
}

@keyframes fadein {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

/* Firefox < 16 */
@-moz-keyframes fadein {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

/* Internet Explorer */
@-ms-keyframes fadein {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

/* Opera < 12.1 */
@-o-keyframes fadein {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>
