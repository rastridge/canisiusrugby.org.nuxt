<template>
	<div class="stats">
		<common-header :title="opponent" />
		<div style="background-color: #fff">
			<div class="table-responsive-md">
				<table class="table table-sm table-bordered text-nowrap">
					<tbody>
						<tr>
							<td>
								<strong
									>Date - {{ $moment(date).format('ddd, MMM D YYYY') }}
								</strong>
							</td>
						</tr>
						<tr>
							<td>
								Kickoff -
								{{ KO_time }}
							</td>
						</tr>
						<tr>
							<td>
								Game level -
								{{ getGameLevelCode(game_level) }}
							</td>
						</tr>
						<tr>
							<td>
								Result -
								{{ getResultCode(ptsFor, ptsAgn) }}
								{{ ptsFor }} -
								{{ ptsAgn }}
							</td>
						</tr>
						<tr>
							<td>Venue - {{ venue }}</td>
						</tr>
						<tr>
							<td>Game type - {{ game_type }}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div v-if="players" class="table-responsive-md">
				<table class="table table-sm table-bordered text-nowrap">
					<thead>
						<tr>
							<th>Pos</th>
							<th>Player</th>
							<th>Tries</th>
							<th>Assts</th>
							<th>Conv</th>
							<th>PenK</th>
							<th>DropG</th>
							<th>Yel</th>
							<th>Red</th>
							<th>Replaced by</th>
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
							<td>{{ player.penk ? player.penk : '' }}</td>
							<td>{{ player.yellow ? player.yellow : '' }}</td>
							<td>{{ player.red ? player.red : '' }}</td>
							<td>{{ player.rfn }} {{ player.rln }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import CommonHeader from '@/components/parts/commonHeader.vue'
import { statsService } from '@/services/'

export default {
	name: 'Stats',
	components: {
		CommonHeader
	},
	data() {
		return {
			id: this.$route.params.id,
			players: null,
			opponent: '',
			venue: '',
			referee: '',
			KO_time: '',
			comment: '',
			date: '',
			game_type: '',
			game_level: '',
			ptsFor: '',
			ptsAgn: '',
			game_image: ''
		}
	},
	created() {
		this.getOne(this.id) // get game info
		this.getPlayers(this.id) // get game info for players
	},
	methods: {
		getOne(id) {
			statsService.getOne(id).then((game) => {
				this.setGame(game)
			})
		},
		setGame(g) {
			this.opponent = g.opponent
			this.venue = g.venue
			this.referee = g.referee
			this.KO_time = g.KO_time
			this.comment = g.comment
			this.date = g.date
			this.game_type = g.game_type
			this.game_level = g.game_level
			this.ptsFor = g.ptsFor
			this.ptsAgn = g.ptsAgn
			this.game_image = g.game_image
		},
		getPlayers(game_id) {
			statsService.getPlayers(game_id).then((players) => {
				this.players = players
			})
		},
		getGameLevelCode(date) {
			const Year = parseInt(this.$moment(date).format('YYYY'))
			let level = ''

			if (Year === 2007 || Year === 2008 || Year === 2009 || Year === 2011) {
				if (this.game_level === 'A') {
					level = 'D1'
				} else if (this.game_level === 'B') {
					level = 'D3'
				} else {
					level = this.game_level
				}
			} else if (
				Year === 2010 ||
				Year === 2013 ||
				Year === 2014 ||
				Year === 2015
			) {
				if (this.game_level === 'A') {
					level = 'D2'
				} else if (this.game_level === 'B') {
					level = 'D3'
				} else {
					level = this.game_level
				}
			} else if (Year === 2012) {
				if (this.game_level === 'A') {
					level = 'D1'
				} else if (this.game_level === 'B') {
					level = 'D2'
				} else {
					level = this.game_level
				}
			} else if (this.game_level === 'A') {
				level = 'A'
			} else if (this.game_level === 'B') {
				level = 'B'
			} else if (this.game_level === 'C') {
				level = 'C'
			} else {
				level = this.game_level
			}
			// eslint-disable-next-line no-console
			// console.log('Year', Year, 'level', level)
			return level
		},
		getResultCode(ptsFor, ptsAgn) {
			let code = ''
			if (ptsFor !== 0 || ptsAgn !== 0) {
				if (ptsFor > ptsAgn) {
					code = 'W'
				} else if (ptsFor < ptsAgn) {
					code = 'L'
				} else {
					code = 'T' // else both 0 show nothin
				}
			}
			return code
		}
	}
}
</script>
