/* eslint-disable vue/no-v-html */
<template>
	<div class="News">
		<common-header title="News" />
		<span v-if="error" class="text-danger">ERROR: {{ error }}</span>
		<loading v-if="!data" />
		<div v-else>
			<!-- games -->
			<div class="row">
				<div class="col-sm-12 col-md-6">
					<lazy-adjacent-games direction="last" />
				</div>
				<div class="col-sm-12 col-md-6">
					<lazy-adjacent-games direction="next" />
				</div>
			</div>
			<!-- twitter -->
			<!--
			<div class="row">
				<div class="col-sm-12 col-md-6">
					<div class="news-frame subheader text-center">
						<a href="#twitter">Latest on Twitter</a>
					</div>
				</div>
				<div class="col-sm-12 col-md-6">
					<div class="news-frame subheader text-center">
						<a href="#facebook">Latest on Facebook</a>
					</div>
				</div>
			</div>
			-->

			<!-- News items -->
			<div class="row">
				<div v-for="newsitem in data" :key="newsitem.news_id" class="col-sm-6">
					<b-card
						style="width: 100%; min-height: 300px"
						class="mb-2 news-frame"
					>
						<template v-slot:header>
							<div class="mb-0 datefont">
								Posted {{ $moment(newsitem.dt).format('dddd, MMMM Do YYYY') }}
								<span style="font-size: 7px">{{ newsitem.news_id }}</span>
							</div>
						</template>
						<b-card-text>
							<h4 class="text-center">{{ newsitem.news_title }}</h4>
						</b-card-text>
						<b-card-text>
							<p class="text-center">{{ newsitem.news_synop }}</p>
						</b-card-text>
						<template v-slot:footer>
							<div class="text-center">
								<b-button
									size="sm"
									variant="light"
									class="btn-link"
									@click="
										selectItem(newsitem)
										showModal('my-modal')
									"
								>
									Read More
								</b-button>
							</div>
						</template>
					</b-card>
				</div>
			</div>

			<a id="facebook" />
			<a id="twitter" />
			<!-- FB
				<div class="row">
				<div class="col-sm-12 col-md-6">
					<div class="b-card news-frame text-center">
						<iframe
							src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FBuffaloRugbyClub%2F&tabs=timeline&width=340&height=400&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId"
							width="340"
							height="400"
							style="border: none; overflow: hidden"
							scrolling="no"
							frameborder="0"
							allowTransparency="true"
							allow="encrypted-media"
						></iframe>
					</div>
				</div>
						  -->

			<!-- Twiiter plugin -->
			<!--
					<div class="col-sm-12 col-md-6">
					<div class="b-card news-frame text-center">
						<a
							class="twitter-timeline"
							data-width="340"
							data-height="400"
							href="https://twitter.com/BuffaloRFC?ref_src=twsrc%5Etfw"
							>Tweets by BuffaloRFC</a
						>
					</div>
				</div>
				-->

			<!-- Recent Updates- -->
			<div class="row">
				<div class="col-sm-12 col-md-6">
					<div class="b-card news-frame">
						<lazy-recent-updates />
					</div>
				</div>
			</div>
		</div>

		<!-- Modal - -->
		<b-modal id="my-modal" size="xl" button-size="sm">
			<template v-slot:modal-header>
				<h5>
					Posted
					{{ $moment(selecteditem.dt).format('dddd, MMMM Do YYYY') }}
				</h5>
				<div class="w-50">
					<b-button
						variant="primary"
						size="sm"
						class="float-right"
						@click="$bvModal.hide('my-modal')"
					>
						Return to News
					</b-button>
				</div>
			</template>

			<template v-slot:default>
				<div class="d-block text-center">
					<h3>{{ selecteditem.news_title }}</h3>
				</div>
				<div class="d-block text-left">
					<p v-html="selecteditem.news_article"></p>
				</div>
			</template>

			<template v-slot:modal-footer>
				<div class="w-100">
					<b-button
						variant="primary"
						size="sm"
						class="float-left"
						@click="$bvModal.hide('my-modal')"
					>
						Return to News
					</b-button>
				</div>
			</template>
		</b-modal>
	</div>
</template>

<script>
import CommonHeader from '@/components/parts/commonHeader.vue'
import loading from '@/components/parts/loading'
import AdjacentGames from '@/components/parts/AdjacentGames'
import RecentUpdates from '@/components/parts/recentUpdates'
import { newsService } from '@/services'

export default {
	name: 'News',
	components: {
		// eslint-disable-next-line vue/no-unused-components
		AdjacentGames,
		// eslint-disable-next-line vue/no-unused-components
		RecentUpdates,
		CommonHeader,
		loading,
	},
	data() {
		return {
			selecteditem: '',
			title: '',
			synopsis: '',
			article: '',
			id: 0,
			data: null,
			error: '',
		}
	},
	created() {
		this.getAllCurrent()
	},
	methods: {
		getAllCurrent() {
			newsService.getAllCurrent().then(
				(data) => {
					this.data = data
				},
				(error) => {
					this.error = error
				}
			)
		},
		selectItem(item) {
			this.selecteditem = item
		},
		showModal(id) {
			this.$bvModal.show(id)
		},
	},
	head() {
		return {
			title: 'News',
			script: [
				{
					src: 'https://platform.twitter.com/widgets.js',
				},
			],
		}
	},
}
</script>
