<template>
	<div>
		<common-header title="Contributions" />
		<span v-if="error" class="text-danger">ERROR: {{ error }}</span>
		<loading v-if="!data" />
		<div v-else>
			<div class="row">
				<div class="col-sm-12">
					<div class="news-frame">
						<!-- Payment options -->
						<h4>Make a donation to the Canisius College Rugby Alumni Fund</h4>

						<h3 style="text-align: center">PayPal or Credit Card</h3>

						<div class="row">
							<div class="col-md-8">
								<div class="store">
									<div class="item">
										<h4>Canisius College Rugby Alumni Association</h4>

										<table>
											<tbody>
												<tr>
													<td>Donation</td>
												</tr>
												<tr>
													<td>
														<form
															action="https://www.paypal.com/cgi-bin/webscr"
															method="post"
															target="_top"
														>
															<input
																name="cmd"
																type="hidden"
																value="_s-xclick"
															/>
															<input
																name="hosted_button_id"
																type="hidden"
																value="5CDTBSDYQQK5Y"
															/>
															<input
																alt="PayPal - The safer, easier way to pay online!"
																border="0"
																name="submit"
																src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
																type="image"
															/>
															<img
																alt=""
																border="0"
																height="1"
																src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
																width="1"
															/>
														</form>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- row -->
			<div class="row">
				<div class="col-sm-6">
					<div class="news-frame">
						<h4>This year our goal is $15,000</h4>
						<h5>Current Total is ${{ total }}</h5>
						<vue-thermometer
							:scale="''"
							:value="total"
							:min="0"
							:max="12000"
							:options="options"
						/>
						<!-- see https://www.npmjs.com/package/vuejs-thermometer -->
					</div>
				</div>
				<div class="col-sm-6">
					<div class="news-frame">
						<h4>The Need</h4>
						<p style="margin: 0px 0px 10.66px">
							<span style="font-family: Georgia, serif"
								><span style="font-size: 14px"
									>Fellow Canisius Rugby Alumni,</span
								></span
							>
						</p>
						<p style="margin: 0px">
							<span style="font-family: Georgia, serif"
								><span style="font-size: 14px"
									><span style="line-height: normal"
										>In order to effectively help the current Canisius rugby
										team, the alumni have formed the
										<b>Canisius Rugby Alumni Assoc</b>. which is a not for
										profit 501c3 organization (all donations/gifts are tax
										deductible). Most college teams (even Canisius&rsquo;s
										oldest rivals- see below) now have formal alumni
										associations that raise money and offer guidance to their
										current teams.
									</span></span
								></span
							>
						</p>
						<p style="margin: 0px">&nbsp;</p>
						<p style="margin: 0px">
							<span style="font-family: Georgia, serif"
								><span style="font-size: 14px"
									><span style="line-height: normal"
										>UB Rugby -
										<a href="https://www.ubraa.org/"
											><font color="#0000ff">https://www.ubraa.org/</font></a
										>
									</span></span
								></span
							>
						</p>
						<p style="margin: 0px">
							<span style="font-family: Georgia, serif"
								><span style="font-size: 14px"
									><span style="line-height: normal"
										>Niagara U.
										<a href="http://deadpheasantrugby.com/"
											><font color="#0000ff"
												>http://deadpheasantrugby.com/</font
											></a
										>
									</span></span
								></span
							>
						</p>
						<p style="margin: 0px">
							<span style="font-family: Georgia, serif"
								><span style="font-size: 14px"
									><span style="line-height: normal"
										>St. Bonaventure Rugby -
										<a
											href="https://www.facebook.com/pg/sburugby/videos/?ref=page_internal"
											><font color="#0000ff"
												>https://www.facebook.com/pg/sburugby/videos/?ref=page_internal</font
											></a
										></span
									></span
								></span
							>
						</p>
						<p style="margin: 0px">&nbsp;</p>

						<p style="margin: 0px">
							<span style="font-family: Georgia, serif"
								><span style="font-size: 14px"
									><span style="line-height: normal"
										>The CCRFC Alumni Assoc. has been in communication with the
										current team and have had discussions regarding their
										budget. While the team receives some money from the College
										they definitely could use help in covering some basic costs.
									</span></span
								></span
							>
						</p>

						<p style="margin: 0px">&nbsp;</p>

						<p style="margin: 0px">
							<span style="font-family: Georgia, serif"
								><span style="font-size: 14px"
									><span style="line-height: normal"
										><strong
											>We have set a fundraising goal of $8,000.00 to help cover
											some of these basic costs for the team. We have already
											received a $1,000.00 donation from an alumni.
										</strong></span
									></span
								></span
							>
						</p>

						<p style="margin: 0px">
							<span style="font-family: Georgia, serif"
								><span style="font-size: 14px"
									><span style="line-height: normal"
										>Any donations or gifts would be greatly appreciated and
										would put to good use. All monies collected will be managed
										and allocated by the board and officers. For example, if we
										are buying equipment or uniforms with the donated money, the
										officers will find the best deal and then purchase items
										directly for the team.
									</span></span
								></span
							>
						</p>

						<p style="margin: 0px">&nbsp;</p>

						<p style="margin: 0px">
							<span style="font-family: Georgia, serif"
								><span style="font-size: 14px"
									><span style="line-height: normal"
										>The costs that we are looking to assist with would
										be:</span
									></span
								></span
							>
						</p>

						<ul style="margin-top: 0in" type="disc">
							<li
								style="
									margin: 0px;
									color: #000000;
									line-height: normal;
									font-family: Times New Roman;
									font-size: 12pt;
									font-style: normal;
									font-weight: normal;
								"
							>
								<span style="font-family: Georgia, serif"
									><span style="font-size: 14px"
										><b>Uniforms</b>- Currently they only have one set of
										Jerseys wish is not even complete- missing the #8 &amp; #13
										Jerseys.</span
									></span
								>
							</li>
							<li
								style="
									margin: 0px;
									color: #000000;
									line-height: normal;
									font-family: Times New Roman;
									font-size: 12pt;
									font-style: normal;
									font-weight: normal;
								"
							>
								<span style="font-family: Georgia, serif"
									><span style="font-size: 14px"
										><b>Equipment-</b> They do not have a scrummage sled and
										they have very few balls and pads.
									</span></span
								>
							</li>
							<li
								style="
									margin: 0px;
									color: #000000;
									line-height: normal;
									font-family: Times New Roman;
									font-size: 12pt;
									font-style: normal;
									font-weight: normal;
								"
							>
								<span style="font-family: Georgia, serif"
									><span style="font-size: 14px"
										><b>Travel</b>- They are looking to travel to a few
										tournaments. They would need help with the entry fees.
										<strong
											><em
												>They actually hosted a 7&rsquo;s tournament this past
												weekend at Demske field. Check out the pics &ndash;
												great job by the guys.</em
											></strong
										>
										<a
											href="http://www.ronraffphotography.com/Sports/Rugby/20180317-Canisius-Sevens-Blender-Tournament/"
											><font color="#0000ff"
												>http://www.ronraffphotography.com/Sports/Rugby/20180317-Canisius-Sevens-Blender-Tournament/</font
											></a
										></span
									></span
								>
							</li>
							<li
								style="
									margin: 0px;
									color: #000000;
									line-height: normal;
									font-family: Times New Roman;
									font-size: 12pt;
									font-style: normal;
									font-weight: normal;
								"
							>
								<span style="font-family: Georgia, serif"
									><span style="font-size: 14px"
										><b>Coaching- </b>Dave Piraino has been coaching the guys
										basically with no compensation and has had to reach into his
										pocket to cover some expenses for the team.</span
									></span
								>
							</li>
						</ul>

						<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px">
							<span style="font-family: Georgia, serif"
								><span style="font-size: 14px"
									><span style="line-height: normal"
										>If you are interested in joining the conversation regarding
										fundraising and managing the funds please let us know and
										you can join our next conference call. Suggestions,
										questions, or any feedback would be greatly appreciated and
										welcomed, please feel free to reach out to any of the guys
										listed below. We will also be meeting up at the Alumni
										weekend May 4-6 to discuss face to face.</span
									></span
								></span
							>
						</p>

						<p style="margin: 0px">&nbsp;</p>

						<p style="margin: 0px">
							<span style="font-family: Georgia, serif"
								><span style="font-size: 14px"
									><span style="line-height: normal"
										>We also have alumni who will be assisting with recruiting
										in the Buffalo area. If you are interested in helping out
										let us know&hellip;Thanks and see you in May.</span
									></span
								></span
							>
						</p>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-8">
					<div class="news-frame">
						<!-- year input-->
						<form>
							<div class="form-group row">
								<label for="inputYear" class="col-sm-3 col-form-label"
									><span style="font-size: larger"
										>Contributions for</span
									></label
								>
								<div class="col-sm-6">
									<select
										id="inputYear"
										v-model="year"
										class="form-control"
										@change="setDate($event.target.value)"
									>
										<option disabled value="">Select a year</option>
										<option v-for="yr in years" :key="yr">
											{{ yr }}
										</option>
									</select>
								</div>
							</div>
						</form>
						<jw-pagination
							style="margin: 1em"
							class="paging text-center"
							:items="data"
							:page-size="20"
							@changePage="onChangePage"
						></jw-pagination>

						<!-- ------------ contributions --------------------------->
						<div class="table-responsive">
							<table class="table table-sm table-hover text-nowrap">
								<tr>
									<th>Date</th>
									<th>Contributor</th>
									<th>Joined</th>
									<th>Amount</th>
									<th>Comment</th>
								</tr>
								<tbody>
									<tr v-for="item in pageOfData" :key="item.id">
										<td>
											{{ $moment(item.contribution_date).format('YYYY-MM-DD') }}
										</td>
										<td>
											{{
												item.contribution_showName
													? item.member_firstname + ' ' + item.member_lastname
													: 'Anonymous'
											}}
										</td>
										<td>
											{{ item.year_joined != 0 ? item.year_joined : '' }}
										</td>
										<td>
											{{
												item.contribution_showAmount
													? item.contribution_amount
													: ''
											}}
										</td>
										<td>
											{{ item.contribution_comment }}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="news-frame">
						<h4>Top 20 Contributors Since 2012</h4>
						<div class="table-responsive">
							<table class="table table-sm table-hover text-nowrap">
								<tbody>
									<tr v-for="item in topcontributors" :key="item.Total">
										<td>{{ item.Name }}</td>
										<td>${{ item.Total }}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import VueThermometer from 'vuejs-thermometer'
import moment from 'moment'
import loading from '@/components/parts/loading'
import CommonHeader from '@/components/parts/commonHeader'
import { contributionService } from '@/services/'
export default {
	components: {
		CommonHeader,
		VueThermometer,
		loading,
	},
	data() {
		return {
			app: 'contributions',
			data: null,
			topcontributors: [],
			pageOfData: [],
			total: 0,
			year: moment().format('YYYY'),
			years: [],
			error: '',
			options: {
				text: {
					color: 'black',
					fontSize: 10,
					textAdjustmentY: 0,
					fontFamily: 'Arial',
					textEnabled: true,
				},
				thermo: {
					color: '#FF0000',
					backgroundColor: '#fcf9f9',
					frameColor: 'black',
					ticks: 11,
					ticksEnabled: true,
					tickColor: 'black',
					tickWidth: '1',
				},
				layout: {
					height: 300,
					width: 90,
				},
			},
		}
	},
	created() {
		this.createYears()
		this.getYearContributions(this.year)
		this.getTopContributors()
		this.getTotal(this.year)
	},
	methods: {
		createYears() {
			const years = []
			const thisyear = parseInt(moment().format('YYYY'))
			for (let year = 2010; year <= thisyear; year++) {
				years.push(year)
			}
			this.years = years
		},
		setDate(value) {
			this.year = value
			this.getYearContributions(value)
		},
		getYearContributions(year) {
			contributionService.getYearContributions(year).then(
				(data) => {
					this.data = data
				},
				(error) => {
					this.error = error
				}
			)
		},
		getTotal(year) {
			contributionService.getTotal(year).then(
				(total) => {
					this.total = total.Total
				},
				(error) => {
					this.error = error
				}
			)
		},
		getTopContributors() {
			contributionService.getTopContributors().then(
				(data) => {
					this.topcontributors = data
				},
				(error) => {
					this.error = error
				}
			)
		},
		onChangePage(pageOfItems) {
			this.pageOfData = pageOfItems
		},
	},
	head() {
		return {
			title: 'Contributions',
		}
	},
}
</script>

<style scoped>
.item {
	background: lightgrey;
	width: 450px;
	margin: 10px;
	padding: 10px;
	border: black thin solid;
	color: black;
}
.item emphasis {
	color: #ff0000;
}

.item th,
td {
	padding: 5px;
	text-align: left;
}
</style>
