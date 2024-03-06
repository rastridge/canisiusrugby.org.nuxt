<template>
	<div id="default">
		<div class="container-fluid">
			<nav class="navbar justify-content-center bg-dark">
				<a
					class="btn btn-outline-light btn-sm"
					href="mailto:admin@canisisrugby.org"
					>Info</a
				>
				<a
					class="btn btn-link"
					href="https://www.facebook.com/groups/57426718803/"
					target="_blank"
					>Active
					<img
						src="~@/assets/imgs/social_icons/Facebook.png"
						width="100"
						height="25"
						alt="facebook"
					/>
				</a>
				<a
					class="btn btn-link"
					href="https://www.facebook.com/groups/1220166308039205/"
					target="_blank"
					>Alumni
					<img
						src="~@/assets/imgs/social_icons/Facebook.png"
						width="100"
						height="25"
						alt="facebook"
					/>
				</a>
				<a
					class="btn btn-link"
					href="https://www.youtube.com/channel/UCqYvbpfEGggXQ_x5FBKPTHg"
					target="_blank"
				>
					<img
						src="~@/assets/imgs/social_icons/YouTube.png"
						width="100"
						height="25"
						alt="youtube"
					/>
				</a>
				<a class="btn btn-outline-light btn-sm" href="/register/men"
					>Men Register</a
				>
			</nav>

			<div class="row">
				<div class="col-sm-12">
					<div class="text-center">
						<div class="brand">CANISIUS</div>
						<img
							src="~@/assets/imgs/crabbies.png"
							alt="Canisius Rugby"
							class="bflo-logo"
						/>
						<div class="brand">RUGBY</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-12">
					<div class="text-center">
						<div class="address-bar">Home Field Delaware Park</div>
					</div>
				</div>
			</div>

			<!--
      /*************************************************************/
              Menus
      /*************************************************************/
      -->
			<b-navbar toggleable="md" class="navbar-main">
				<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
				<b-collapse id="nav-collapse" is-nav>
					<b-navbar-nav style="margin: auto">
						<!-- About -->
						<b-nav-item-dropdown text="About">
							<b-dropdown-item
								v-for="item in content"
								:key="item.id"
								:to="'/content/' + item.id"
								>{{ item.content_name }}</b-dropdown-item
							>
							<b-dropdown-item to="/members/officers" exact
								>Officers</b-dropdown-item
							>
							<b-dropdown-item to="/members" exact>Members</b-dropdown-item>
							<b-dropdown-item
								v-b-tooltip.hover
								to="/payments"
								exact
								title="payments to the club"
								>Payments</b-dropdown-item
							>
							<b-dropdown-item v-if="!isLoggedIn" to="/admin/loginpage" exact
								>Login</b-dropdown-item
							>
						</b-nav-item-dropdown>
						&nbsp; &nbsp;

						<!-- News -->
						<b-nav-item-dropdown text="News">
							<b-dropdown-item to="/news" exact>News</b-dropdown-item>
							<b-dropdown-item
								v-b-tooltip.hover
								to="/contributions"
								exact
								title="Current, past, howto"
								>Contributions</b-dropdown-item
							>
						</b-nav-item-dropdown>
						&nbsp; &nbsp;

						<!-- Competition -->
						<b-nav-item-dropdown text="Competition">
							<b-dropdown-item to="/schedule"
								>Schedule and Results</b-dropdown-item
							>
							<b-dropdown-item to="/stats/player_stats" exact
								>Player Stats Fifteens</b-dropdown-item
							>
							<b-dropdown-item to="/stats/player_stats7s" exact
								>Player Stats Sevens</b-dropdown-item
							>
							<b-dropdown-item to="/stats/team_stats" exact
								>Team Record</b-dropdown-item
							>
							<b-dropdown-item to="/stats/player_history" exact
								>Player History</b-dropdown-item
							>
						</b-nav-item-dropdown>

						<!-- History -->
						<b-nav-item-dropdown text="History">
							<b-dropdown-item to="/content/34">Photos</b-dropdown-item>
							<b-dropdown-item to="/video">Videos</b-dropdown-item>
							<b-dropdown-item to="/archive/documents"
								>Document Archives</b-dropdown-item
							>
							<b-dropdown-item to="/archive/newsletters"
								>Newsletter Archives</b-dropdown-item
							>
							<b-dropdown-item to="/archive/news"
								>News Archives</b-dropdown-item
							>
						</b-nav-item-dropdown>
					</b-navbar-nav>
				</b-collapse>
			</b-navbar>
			<!--
			<div class="row">
				<div class="col-sm-12 text-center">
					<p>
						Copyright {{ $moment().format('YYYY') }} &copy; The Canisius College
						Rugby Club - Buffalo New York
					</p>
				</div>
			</div>
			-->
		</div>
	</div>
</template>

<script>
import { contentService } from '@/services/'
// import SponsorAds from '@/components/parts/SponsorAds'

export default {
	/*
	components: {
		SponsorAds,
	},
	*/
	data() {
		return {
			isLoggedIn: false,
			content: null,
		}
	},
	middleware: 'noauth',
	created() {
		this.getCustomMenuItems()
	},
	methods: {
		getCustomMenuItems() {
			contentService.getCustomMenuItems().then(
				(data) => {
					this.content = data
				},
				(error) => {
					this.error = error
				}
			)
		},
	},
	head() {
		return {
			title: 'Welcome to the Canisius College Rugby Club',
			bodyAttrs: {
				class: 'frontend-body',
			},
		}
	},
}
</script>

<style lang="scss">
@import '~@/assets/scss/frontend.scss';
</style>
