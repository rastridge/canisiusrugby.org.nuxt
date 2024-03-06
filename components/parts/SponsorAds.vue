<template>
	<div id="sponsorad">
		<div class="row">
			<div class="col-sm-12">
				<div class="m-3">
					<a :href="item.ad_client_website" target="_blank">
						<b-img :src="item.ad_image_path" fluid />
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { sponsorService } from '@/services/'

export default {
	name: 'SponsorAds',
	data() {
		return {
			item: { client_website: '', ad_image_path: '' },
			sponsors: [],
			adList: [],
			adId: '',
		}
	},
	watch: {
		$route(to, from) {
			this.showRandomSponsor()
		},
	},
	created() {
		this.getAll()
	},
	methods: {
		showRandomSponsor() {
			const list = []
			this.sponsors.forEach((d) => {
				list.push(d.id)
			})
			this.adList = list
			this.adId = this.adList[getRandomInt(0, this.adList.length)]
			this.item = this.sponsors.find((d) => d.id === this.adId)

			function getRandomInt(min, max) {
				min = Math.ceil(min)
				max = Math.floor(max)
				return Math.floor(Math.random() * (max - min + 1)) + min
			}
		},
		onChangePage(pageOfItems) {
			this.pageOfData = pageOfItems
		},
		getAll() {
			sponsorService.getAllCurrent().then(
				(data) => {
					this.sponsors = data
					this.showRandomSponsor()
				},
				(error) => {
					this.error = error
				}
			)
		},
		getOne(id) {
			sponsorService.getOne(id).then(
				(data) => {
					this.item = data
				},
				(error) => {
					this.error = error
				}
			)
		},
	},
}
</script>
