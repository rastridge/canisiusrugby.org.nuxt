<template>
	<div>
		<common-header title="Virtual Clubhouse" />

		<div class="text-center">
			<p>Click on a item</p>
			<p>
				<b-button @click="returnToList()">
					Return to Main Room
				</b-button>
			</p>
		</div>

		<div class="bg">
			<div v-for="item in filteredData" :key="item.id" class="card my-card">
				<a
					href="#"
					@click.prevent="
						selectItem(item)
						showModal('modal-1')
					"
				>
					<img :src="item.clubhouse_filepath" class="card-img-top" alt="..." />
					<div class="card-body">
						<h5 class="card-title caption">{{ item.clubhouse_title }}</h5>
					</div>
				</a>
			</div>
		</div>

		<!--  modal template -->
		<b-modal
			id="modal-1"
			size="lg"
			centered
			hide-footer
			:title="selectedItem.clubhouse_title"
		>
			<div style="text-align:center;">
				<h5 class="my-4">Held by {{ selectedItem.clubhouse_owner }}</h5>
				<img :src="selectedItem.clubhouse_filepath" alt="" width="100%" />
				<h5 class="my-4">{{ selectedItem.clubhouse_description }}</h5>
			</div>
		</b-modal>

		<!--  modal template -->
	</div>
</template>

<script>
import CommonHeader from '@/components/parts/commonHeader'
import { clubhouseService } from '@/services/'

export default {
	components: {
		CommonHeader
	},
	data() {
		return {
			clubhouse_category: this.$route.params.rooms,
			data: null,
			selectedItem: {},
			clubhouse_title: '',
			clubhouse_filepath: ''
		}
	},
	computed: {
		filteredData() {
			return this.data.filter(function(d) {
				return d.clubhouse_category === this
			}, this.clubhouse_category)
		}
	},
	created() {
		this.getAll()
	},
	methods: {
		returnToList() {
			this.$router.push('/clubhouse')
		},
		getAll() {
			clubhouseService.getAll().then(
				(data) => {
					this.data = data
				},
				(error) => {
					this.error = error
				}
			)
		},
		selectItem(item) {
			this.selectedItem = item
		},
		showModal(id) {
			this.$bvModal.show(id)
		}
	},
	head() {
		return {
			title: 'Virtual Clubhouse'
		}
	}
}
</script>

<style lang="scss" scoped>
.my-card {
	background: transparent;
	margin: 1rem;
	display: inline-block;
	max-width: 20rem;
}
.bg {
	background-image: url('/_img/_backgrounds/wood_clubhouse.jpg');
	/* Center and scale the image nicely */
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	padding: 2em;
}
.caption {
	background-image: url('/_img/_backgrounds/bronze.jpg');
	/* Center and scale the image nicely */
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	text-align: center;
	padding: 0.5em;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	font-size: small;
}

#modal-1 {
	background-color: gray;
	text-align: center;
}
</style>
