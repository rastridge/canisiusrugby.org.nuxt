<template>
	<div class="stats">
		<common-header title="Schedules and Results" />
		<span v-if="error" class="text-danger">ERROR: {{ error }}</span>
		<loading v-if="!data" />
		<div v-else>
			<div class="row">
				<div class="col-sm-12">
					<div class="text-center">
						<form>
							<div class="form-group row justify-content-center">
								<div class="col-sm-4">
									<b-form-select
										v-model="year"
										:options="seasons"
										value-field="season.year"
										text-field="season.season"
										@change="setDate($event)"
									></b-form-select>
								</div>

								<div class="col-sm-4">
									<b-form-select
										v-model="game_type_id"
										class="form-control"
										@change="setGameType($event)"
									>
										<option value="8">All</option>
										<option value="1">League</option>
										<option value="2">Playoff</option>
										<option value="3">Friendly</option>
										<option value="4">Tournament</option>
										<option value="5">Alumni</option>
									</b-form-select>
								</div>
							</div>
						</form>

						<p class="subheader">
							{{ game_type_id === '1' ? 'League' : 'Other' }}<br />
							{{ season.season }}
						</p>

						<jw-pagination
							style="margin: 1em"
							class="paging text-center"
							:items="filteredData"
							:page-size="20"
							@changePage="onChangePage"
						></jw-pagination>
					</div>
				</div>
			</div>

			<div v-if="filteredData" class="news-frame">
				<div class="table-responsive">
					<table class="table table-sm table-hover text-nowrap">
						<thead>
							<th style="text-align: right">Date</th>
							<th>KO Time</th>
							<th>Level</th>
							<th>Opponent</th>
							<th>&nbsp;</th>
							<th>For</th>
							<th>Agn</th>
							<th>Venue</th>
							<th>Game Type</th>
							<th></th>
						</thead>
						<tbody>
							<tr v-for="item in pageOfData" :key="item.game_id">
								<td style="text-align: right">
									<strong>{{
										$moment(item.date).format('ddd, MMM D YYYY')
									}}</strong>
								</td>
								<td>{{ AmPm(item.KO_time) }}</td>
								<td>
									{{ getGameLevelCode(item) }}
								</td>
								<th>
									<a href="#" @click.prevent="selectItem(item)">
										{{ item.opponent }}
									</a>
								</th>
								<td>{{ getResultCode(item) }}</td>
								<td>{{ item.ptsFor }}</td>
								<td>{{ item.ptsAgn }}</td>
								<td>{{ item.venue }}</td>
								<td>{{ item.game_type }}</td>
								<td>
									<span style="font-size: 7px">{{ item.game_id }}</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div v-else>
				<p class="subheader text-center">No games recorded for this season</p>
			</div>
		</div>

		<!-- The modal -->
		<div>
			<b-modal id="my-modal" size="xl">
				<template v-slot:modal-header>
					<h5>{{ selecteditem.opponent }}</h5>
					<div class="w-50">
						<b-button
							variant="primary"
							size="sm"
							class="float-right"
							@click="hideModal('my-modal')"
						>
							Return to schedule
						</b-button>
					</div>
				</template>
				<template>
					<div class="table-responsive-md" style="background-color: #fff">
						<table class="table">
							<tbody>
								<tr>
									<td>
										<strong
											>{{
												$moment(selecteditem.date).format('ddd, MMM D YYYY')
											}}
											{{ selecteditem.KO_time }}
										</strong>
									</td>
								</tr>
								<tr>
									<td>
										Game level -
										{{ getGameLevelCode(selecteditem) }}
									</td>
								</tr>
								<tr>
									<td>
										Referee -
										{{ selecteditem.referee }}
									</td>
								</tr>
								<tr>
									<td>
										{{ getResultCode(selecteditem) }}
										{{ selecteditem.ptsFor }} -
										{{ selecteditem.ptsAgn }}
									</td>
								</tr>
								<tr>
									<td>Venue - {{ selecteditem.venue }}</td>
								</tr>
								<tr>
									<td>Game type - {{ selecteditem.game_type }}</td>
								</tr>
								<tr>
									<td>Comment - {{ selecteditem.comment }}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div v-if="players" class="table-responsive">
						<table class="table table-sm table-bordered text-nowrap">
							<thead>
								<tr>
									<th width="10">Pos</th>
									<th width="100">Player</th>
									<th width="10">Tries</th>
									<th width="10">Assts</th>
									<th width="10">Conv</th>
									<th width="10">PenK</th>
									<th width="10">DropG</th>
									<th width="10">Yel</th>
									<th width="10">Red</th>
									<th width="100">Replaced by</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="player in players" :key="player.position_id">
									<td>{{ player.position_id }}</td>
									<td>{{ player.pfn }} {{ player.pln }}</td>
									<td>{{ player.tries ? player.tries : '' }}</td>
									<td>{{ player.assists ? player.assists : '' }}</td>
									<td>{{ player.conv ? player.conv : '' }}</td>
									<td>{{ player.penk ? player.penk : '' }}</td>
									<td>{{ player.dgoal ? player.dgoal : '' }}</td>
									<td>{{ player.yellow ? player.yellow : '' }}</td>
									<td>{{ player.red ? player.red : '' }}</td>
									<td>{{ player.rfn }} {{ player.rln }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</template>
				<template v-slot:modal-footer>
					<div class="w-100">
						<b-button
							variant="primary"
							size="sm"
							class="float-left"
							@click="hideModal('my-modal')"
						>
							Return to schedule
						</b-button>
					</div>
				</template>
			</b-modal>
		</div>
	</div>
</template>

<script>
import moment from 'moment'
import loading from '@/components/parts/loading'
import CommonHeader from '@/components/parts/commonHeader.vue'
import { statsService } from '@/services/'

export default {
	name: 'Stats',
	components: {
		CommonHeader,
		loading,
	},
	data() {
		return {
			season_id: this.$route.params.seasons,
			data: [],
			pageOfData: [],
			selecteditem: '',
			id: 0,
			gamedate: '',
			game_type_id: '1',
			seasons: [],
			season: {},
			year: '',
			players: [],
			pos: 1,
			error: '',
		}
	},
	computed: {
		filteredData() {
			const filtered = this.data.filter(this.checkSeason)
			const filtered2 = filtered.filter(this.checkGameType)
			return filtered2
		},
	},
	created() {
		this.getAll()
		this.makeSeasons()
		this.workingState()
	},
	methods: {
		AmPm(datestring) {
			const timearray = datestring.split(':')
			const hours = parseInt(timearray[0])
			const AmOrPm = hours >= 12 ? 'pm' : 'am'
			const hours12 = hours > 12 ? hours % 12 : hours
			const minutes = timearray[1]
			return hours12 + ':' + minutes + ' ' + AmOrPm
		},

		getAll() {
			statsService.getAll().then(
				(data) => {
					this.data = data
				},
				(error) => {
					this.error = error
				}
			)
		},
		workingState() {
			this.year = moment().format('YYYY')
			this.game_type_id = '8'
		},
		getPlayers(game_id) {
			statsService.getPlayers(game_id).then((players) => {
				this.players = players
			})
		},
		getGameLevelCode(stat) {
			const Year = parseInt(this.$moment(stat.date).format('YYYY'))
			let level = ''

			if (Year === 2007 || Year === 2008 || Year === 2009 || Year === 2011) {
				if (stat.game_level === 'A') {
					level = 'D1'
				} else if (stat.game_level === 'B') {
					level = 'D3'
				} else {
					level = stat.game_level
				}
			} else if (
				Year === 2010 ||
				Year === 2013 ||
				Year === 2014 ||
				Year === 2015
			) {
				if (stat.game_level === 'A') {
					level = 'D2'
				} else if (stat.game_level === 'B') {
					level = 'D3'
				} else {
					level = stat.game_level
				}
			} else if (Year === 2012) {
				if (stat.game_level === 'A') {
					level = 'D1'
				} else if (stat.game_level === 'B') {
					level = 'D2'
				} else {
					level = stat.game_level
				}
			} else if (stat.game_level === 'A') {
				level = 'A'
			} else if (stat.game_level === 'B') {
				level = 'B'
			} else if (stat.game_level === 'C') {
				level = 'C'
			} else {
				level = stat.game_level
			}

			return level
		},
		checkGameType(d) {
			return !!(
				this.game_type_id === '8' || this.game_type_id == d.game_type_id
			)
		},
		checkSeason(d) {
			let year1 = moment(this.year).format('YYYY')
			let year2 = moment(this.year).add(1, 'year').format('YYYY')
			year1 = year1 + '-08-01'
			year2 = year2 + '-07-31'
			const between = moment(d.date).isBetween(year1, year2, 'day', '[]')
			return between
		},
		setDate(value) {
			this.season = value
		},
		makeSeasons() {
			// eslint-disable-next-line prefer-const
			let seasons = []
			const thisyear = parseInt(moment().format('YYYY'))
			for (let y = thisyear; y >= 1987; y--) {
				const year1 = moment(y.toString())
				const year2 = moment(year1).add(1, 'year')
				seasons.push({
					season: {
						year: year1.format('YYYY'),
						season:
							year1.format('YYYY') +
							' Fall  -> ' +
							year2.format('YYYY') +
							' Spring ',
					},
				})
			}
			this.seasons = seasons
		},
		setGameType(value) {
			this.gametype = value
		},
		onChangePage(pageOfItems) {
			this.pageOfData = pageOfItems
		},
		selectItem(item) {
			// calling this method and showing modal does not cause the problem
			this.selecteditem = item
			this.getPlayers(item.game_id)
			this.showModal('my-modal')
		},
		showModal(id) {
			this.$bvModal.show(id)
		},
		hideModal(id) {
			this.$bvModal.hide(id)
		},
		getResultCode(stat) {
			let code = ''
			if (stat.ptsFor !== 0 || stat.ptsAgn !== 0) {
				if (stat.ptsFor > stat.ptsAgn) {
					code = 'W'
				} else if (stat.ptsFor < stat.ptsAgn) {
					code = 'L'
				} else {
					code = 'T' // else both 0 show nothin
				}
			}
			return code
		},
	},
	head() {
		return {
			title: 'Schedule and Results',
		}
	},
}
</script>

<style lang="scss" scoped>
.paging {
	margin: 0.5em;
}
</style>
