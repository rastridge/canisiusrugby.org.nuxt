<template>
	<div id="player-history">
		<common-header title="Player History" />
		<span v-if="error" class="text-danger">ERROR: {{ error }}</span>
		<loading v-if="!suggestions" />
		<div v-else>
			<div class="row justify-content-md-center">
				<div class="col-md-auto">
					<div class="form-group">
						<label class="control-label">Enter Member, Last Name first</label>
						<auto-complete
							v-model="account_id"
							:items="suggestions"
							@setId="setAccountId($event)"
						/>
						<span v-if="!$v.account_id.required" class="error"
							>Member is required</span
						>
					</div>
				</div>
				<div class="col col-lg-2"></div>
			</div>

			<div class="row justify-content-md-center">
				<div class="col-md-auto">
					<div class="info-frame">
						<p>Sort by tries, conversion, penalty kicks, date, opponent</p>
						<p>
							Search by venue, date, opponent and then sort by tries, conv, etc.
						</p>
						<p>
							For example search by "aard" and sort by "tries" to discover in
							which Aardvark match you scored the most tries.
						</p>
						<p>
							OR no search, just sort by pen kick to find the match you made the
							most penalty kicks.
						</p>
						<p>
							OR search for Wolfhounds to see how matches you played in against
							Cincinnati or Boston Irish
						</p>
						<p>OR search by year. For example "2004"</p>
					</div>
				</div>
			</div>

			<div v-if="data">
				<div class="row justify-content-md-center">
					<div class="col-sm-12">
						<!-- User Interface controls -->
						<b-row>
							<b-col lg="6" class="my-1">
								<b-form-group
									label="Filter On"
									label-cols-sm="3"
									label-align-sm="right"
									label-size="sm"
									description="Leave all unchecked to filter on all data"
									class="mb-0"
								>
									<b-form-checkbox-group v-model="filterOn" class="mt-1">
										<b-form-checkbox value="opponent">Opponent</b-form-checkbox>
										<b-form-checkbox value="venue">Venue</b-form-checkbox>
										<b-form-checkbox value="date">Date</b-form-checkbox>
									</b-form-checkbox-group>
								</b-form-group>
							</b-col>
							<b-col lg="6" class="my-1">
								<b-form-group
									label="Filter"
									label-cols-sm="3"
									label-align-sm="right"
									label-size="sm"
									label-for="filterInput"
									class="mb-0"
								>
									<b-input-group size="sm">
										<b-form-input
											id="filterInput"
											v-model="filter"
											type="search"
											placeholder="Type to Search"
										></b-form-input>
										<b-input-group-append>
											<b-button :disabled="!filter" @click="filter = ''"
												>Clear</b-button
											>
										</b-input-group-append>
									</b-input-group>
								</b-form-group>
							</b-col>
							<b-col sm="5" md="6" class="my-1">
								<b-form-group
									label="Per page"
									label-cols-sm="6"
									label-cols-md="4"
									label-cols-lg="3"
									label-align-sm="right"
									label-size="sm"
									label-for="perPageSelect"
									class="mb-0"
								>
									<b-form-select
										id="perPageSelect"
										v-model="perPage"
										size="sm"
										:options="pageOptions"
									></b-form-select>
								</b-form-group>
							</b-col>
							<b-col sm="7" md="6" class="my-1">
								<b-pagination
									v-model="currentPage"
									:total-rows="totalRows"
									:per-page="perPage"
									align="fill"
									size="sm"
									class="my-0"
								></b-pagination>
							</b-col>
						</b-row>
					</div>
				</div>
				<br />
				<br />
				<div class="row justify-content-md-center">
					<div class="col-sm-12">
						<div class="news-frame">
							<!-- Main table element -->
							<b-table
								show-empty
								small
								responsive
								class="text-nowrap"
								:items="data"
								:fields="fields"
								:current-page="currentPage"
								:per-page="perPage"
								:filter="filter"
								:filter-included-fields="filterOn"
								:sort-by.sync="sortBy"
								:sort-desc.sync="sortDesc"
								:sort-direction="sortDirection"
								@filtered="onFiltered"
							>
								<template v-slot:cell(opponent)="row">
									<a href="#" @click.prevent="selectItem(row.item)">
										{{ row.item.opponent }}
									</a>
								</template>
							</b-table>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- The modal -->
		<b-modal id="my-modal" size="xl" button-size="sm">
			<template v-slot:modal-header>
				<h5>{{ selecteditem.opponent }}</h5>
				<div class="w-100">
					<b-button
						variant="primary"
						size="sm"
						class="float-right"
						@click="hideModal('my-modal')"
						>Close</b-button
					>
				</div>
			</template>
			<template>
				<div style="background-color: #fff">
					<table class="table table-sm text-nowrap">
						<tbody>
							<tr>
								<td>
									<strong>
										{{ $moment(selecteditem.date).format('ddd, MMM D YYYY') }}
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
						</tbody>
					</table>
				</div>
				<div v-if="players" class="table-responsive">
					<table class="table table-sm table-bordered text-nowrap">
						<thead>
							<tr>
								<th width="10" align="left">Pos</th>
								<th width="100" nowrap="nowrap" align="left">Player</th>
								<th width="10">Tries</th>
								<th width="10">Assts</th>
								<th width="10">Conv</th>
								<th width="10">PenK</th>
								<th width="10">DropG</th>
								<th width="10">Yel</th>
								<th width="10">Red</th>
								<th width="100" nowrap>Replaced by</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="player in players" :key="player.position_id">
								<td align="left">{{ player.position_id }}</td>
								<td>{{ player.pfn }} {{ player.pln }}</td>
								<td>{{ player.tries ? player.tries : '' }}</td>
								<td>
									{{ player.assists ? player.assists : '' }}
								</td>
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
			</template>
			<template v-slot:modal-footer>
				<div class="w-100">
					<b-button
						variant="primary"
						size="sm"
						class="float-right"
						@click="hideModal('my-modal')"
						>Close</b-button
					>
				</div>
			</template>
		</b-modal>
	</div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { statsService, accountService } from '@/services'
import CommonHeader from '@/components/parts/commonHeader'
import loading from '@/components/parts/loading'
import AutoComplete from '@/components/parts/AutoComplete.vue'

export default {
	components: {
		CommonHeader,
		AutoComplete,
		loading,
	},
	mixins: [validationMixin],
	data() {
		return {
			account_id: '',
			suggestions: null,
			data: null,
			players: null,
			selecteditem: '',
			fields: [
				{
					key: 'date',
					label: 'Date',
					sortable: true,
					formatter: 'formatDate',
				},
				{
					key: 'opponent',
					label: 'Opponent',
					sortable: true,
				},
				{
					key: 'venue',
					label: 'Venue',
					sortable: true,
				},
				{
					key: 'ptsFor',
					label: 'ptsFor',
					sortable: true,
				},
				{
					key: 'ptsAgn',
					label: 'ptsAgn',
					sortable: true,
				},
				{
					key: 'tries',
					label: 'Tries',
					sortable: true,
				},
			],
			currentPage: 1,
			perPage: 10,
			pageOptions: [10, 15, 20],
			sortBy: '',
			sortDesc: false,
			sortDirection: 'asc',
			filter: null,
			filterOn: [],
			totalRows: 0,
			error: '',
			submitStatus: 'Ok',
		}
	},
	validations: {
		account_id: {
			required,
		},
	},
	computed: {
		sortOptions() {
			// Create an options list from our fields
			return this.fields
				.filter((f) => f.sortable)
				.map((f) => {
					return { text: f.label, value: f.key }
				})
		},
	},
	created() {
		this.getAll()
	},
	methods: {
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
			// eslint-disable-next-line no-console
			// console.log('Year', Year, 'level', level)
			return level
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
		getPlayers(game_id) {
			statsService.getPlayers(game_id).then((players) => {
				this.players = players
			})
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
		formatDate(value) {
			return this.$moment(value).format('MMM DD  YYYY')
		},
		getAll() {
			accountService.getAll().then(
				(accounts) => {
					this.suggestions = accounts
				},
				(error) => {
					this.error = error
				}
			)
		},
		setAccountId(value) {
			this.account_id = value
			this.$v.account_id.$touch()
			this.playerGamesPlayed(this.account_id)
		},
		playerGamesPlayed(id) {
			statsService.playerGamesPlayed(id).then((stats) => {
				this.data = stats
				this.totalRows = stats.length
			})
		},
		onFiltered(filteredItems) {
			// Trigger pagination to update the number of buttons/pages due to filtering
			this.totalRows = filteredItems.length
			this.currentPage = 1
		},
	},
	head() {
		return {
			title: 'Player History',
		}
	},
}
</script>
