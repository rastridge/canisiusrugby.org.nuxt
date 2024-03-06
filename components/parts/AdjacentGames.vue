<template>
	<div>
		<b-card style="width: 100%" class="mb-2 news-frame">
			<template v-slot:header>
				<h6 class="mb-0">
					<span class="subheader">{{ direction }} Matches</span>
				</h6>
			</template>
			<b-card-text>
				<div v-if="stats.length" class="table-responsive">
					<table class="table table-condensed text-nowrap">
						<tbody>
							<tr>
								<td>{{ stats[0].opponent }}</td>
								<td>{{ stats[0].game_level }}</td>
								<td>{{ $moment(stats[0].dt).format('ddd, MMM Do') }}</td>
								<td v-if="direction === 'last'">
									{{ stats[0].ptsFor }} - {{ stats[0].ptsAgn }}
								</td>
								<td v-else>
									{{ AmPm(stats[0].KO_time) }}
								</td>
								<td>{{ stats[0].venue }}</td>
							</tr>
							<tr v-if="stats[1]">
								<td>{{ stats[1].opponent }}</td>
								<td>{{ stats[1].game_level }}</td>
								<td>{{ $moment(stats[1].dt).format('ddd, MMM Do') }}</td>
								<td v-if="direction === 'last'">
									{{ stats[1].ptsFor }} - {{ stats[1].ptsAgn }}
								</td>
								<td v-else>
									{{ AmPm(stats[1].KO_time) }}
								</td>
								<td>{{ stats[1].venue }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</b-card-text>
		</b-card>
	</div>
</template>

<script>
import { statsService } from '@/services/'
// import { AmPm } from '@/helpers'

export default {
	props: {
		direction: { type: String, default: 'next', required: true },
	},
	data() {
		return {
			stats: [],
		}
	},
	created() {
		statsService.getAdjacent(this.direction).then((stats) => {
			this.stats = stats
		})
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
	},
}
</script>
