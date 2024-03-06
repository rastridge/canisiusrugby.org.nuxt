<template>
	<div>
		<commonheader title="Team Record"></commonheader>
		<span v-if="error" class="text-danger">ERROR: {{ error }}</span>
		<loading v-if="!data" />
		<div v-else>
			<div class="row">
				<div class="col-sm-12">
					<div class="news-frame">
						<b-table-simple hover small responsive text-nowrap>
							<b-thead>
								<b-tr>
									<b-th>Season</b-th>
									<b-th>Games</b-th>
									<b-th>Wins</b-th>
									<b-th>Loses</b-th>
									<b-th>Ties</b-th>
									<b-th>?</b-th>
								</b-tr>
								<b-tr>
									<b-th>All time</b-th>
									<b-th>{{ total.game_count }}</b-th>
									<b-th>{{ total.wins }}</b-th>
									<b-th>{{ total.losses }}</b-th>
									<b-th>{{ total.ties }}</b-th>
									<b-th>{{ total.unknown }}</b-th>
								</b-tr>
							</b-thead>
							<b-tbody>
								<b-tr v-for="(item, index) in data" :key="index">
									<b-td>
										<nuxt-link :to="'/schedule/' + item.season"
											><a>
												{{ item.season }}
											</a>
										</nuxt-link>
									</b-td>

									<b-td>{{ item.game_count }}</b-td>
									<b-td>{{ item.wins }}</b-td>
									<b-td>{{ item.losses }}</b-td>
									<b-td>{{ item.ties }}</b-td>
									<b-td>{{ item.unknown }}</b-td>
								</b-tr>
							</b-tbody>
						</b-table-simple>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { statsService } from '@/services'
import commonheader from '@/components/parts/commonHeader'
import loading from '@/components/parts/loading'

export default {
	components: {
		commonheader,
		loading,
	},
	data() {
		return {
			error: '',
			data: null,
			total: {},
		}
	},
	created() {
		this.getTeamStats()
		this.getTeamStatsTotal()
	},
	methods: {
		getTeamStats() {
			statsService.getTeamStats().then((stats) => {
				this.data = stats
			})
		},
		getTeamStatsTotal() {
			statsService.getTeamStatsTotal().then((stats) => {
				this.total = stats
			})
		},
	},
	head() {
		return {
			title: 'Team Record',
		}
	},
}
</script>

<style lang="scss" scoped>
.frame {
	padding: 1rem;
	padding-top: 0;
	margin-top: 1rem;
	background-color: rgb(255, 255, 255);
}
</style>
