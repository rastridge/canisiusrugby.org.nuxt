/* eslint-disable vue/no-v-html */
<template>
	<div class="Members">
		<common-header title="Members" />
		<span v-if="error" class="text-danger">ERROR: {{ error }}</span>
		<loading v-if="!data" />
		<div v-else>
			<div class="row">
				<div class="col-sm-3">
					<div class="card my-card">
						<a href="#" @click.prevent="selectType(2)"
							><span class="sub-headline">Actives<br /></span
						></a>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="card my-card">
						<a href="#" @click.prevent="selectType(3)"
							><span class="sub-headline">Alumni</span><br
						/></a>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="card my-card">
						<a href="#" @click.prevent="selectType(8)"
							><span class="sub-headline">Ad Astra</span><br
						/></a>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="card my-card">
						<p class="sub-headline">Individual Member Lookup</p>
						<auto-complete :items="data" @setId="setAccountId($event)" />
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-12">
					<!-- actives -->
					<div v-if="output1" class="output">
						<jw-pagination
							style="margin: 1em"
							class="paging text-center"
							:items="filteredData"
							:page-size="20"
							@changePage="onChangePage"
						></jw-pagination>
						<div class="news-frame">
							<h1 class="sub-headline">Active Players</h1>
							<div class="table-responsive">
								<table class="table table-sm table-hover text-nowrap">
									<thead>
										<tr>
											<th>&nbsp;</th>
											<th>Year Joined</th>
											<th>Position</th>
											<th>Previous Club</th>
											<th class="w-25">Email</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="item in pageOfData" :key="item.id">
											<td>
												{{ item.title }}
											</td>
											<td>
												{{ item.member_year }}
											</td>
											<td>
												{{ item.member_position }}
											</td>
											<td>
												{{ item.member_prev_club }}
											</td>
											<td class="w-25">
												<expose-email :email="item.account_email" />
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>

					<!-- alumni -->
					<div v-if="output2" class="output">
						<jw-pagination
							style="margin: 1em"
							class="paging text-center"
							:items="filteredData"
							:page-size="20"
							@changePage="onChangePage"
						></jw-pagination>
						<div class="news-frame">
							<h1 class="sub-headline">Alumni Members</h1>
							<div class="table-responsive">
								<table class="table table-sm table-hover text-nowrap">
									<thead>
										<tr>
											<th>&nbsp;</th>
											<th>Year Joined</th>
											<th>Position</th>
											<th>Previous Club</th>
											<th class="w-25">Email</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="item in pageOfData" :key="item.id">
											<td>
												{{ item.title }}
											</td>
											<td>
												{{ item.member_year }}
											</td>
											<td>
												{{ item.member_position }}
											</td>
											<td>
												{{ item.member_prev_club }}
											</td>
											<td class="w-25">
												<expose-email :email="item.account_email" />
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>

					<!-- ad astra -->
					<div v-if="output3" class="output">
						<jw-pagination
							style="margin: 1em"
							class="paging text-center"
							:items="filteredData"
							:page-size="20"
							@changePage="onChangePage"
						></jw-pagination>

						<div class="news-frame">
							<h1 class="sub-headline">Ad Astra</h1>
							<div class="table-responsive">
								<table class="table table-sm table-hover text-nowrap">
									<thead>
										<tr>
											<th>&nbsp;</th>
											<th>Joined</th>
											<th>Position</th>
											<th>Previous Club</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="item in pageOfData" :key="item.id">
											<td>
												{{ item.title }}
											</td>
											<td>
												{{ item.member_year }}
											</td>
											<td>
												{{ item.member_position }}
											</td>
											<td>
												{{ item.member_prev_club }}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-12 offset-lg-1 col-lg-10">
					<div v-if="output4" class="output news-frame">
						<div class="table-responsive">
							<table class="table table-sm table-hover text-nowrap">
								<thead>
									<tr>
										<th>&nbsp;</th>
										<th>Joined</th>
										<th>Position</th>
										<th>Previous Club</th>
										<th>City</th>
										<th>State Country</th>
										<th class="w-25">Email</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											{{ account.title }}
										</td>
										<td>
											{{ account.member_year }}
										</td>
										<td>
											{{ account.member_position }}
										</td>
										<td>
											{{ account.member_prev_club }}
										</td>
										<td>
											{{ account.account_addr_city }}
										</td>
										<td>
											{{ account.account_addr_state }}
											{{ account.account_addr_country }}
										</td>
										<td class="w-25">
											<expose-email :email="account.account_email" />
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
</template>

<script>
import { accountService } from '@/services'
import CommonHeader from '@/components/parts/commonHeader.vue'
import loading from '@/components/parts/loading'
import AutoComplete from '@/components/parts/AutoComplete.vue'
import ExposeEmail from '@/components/parts/ExposeEmail'

export default {
	name: 'Membership',
	components: {
		CommonHeader,
		AutoComplete,
		ExposeEmail,
		loading,
	},
	data() {
		return {
			account: {},
			output1: false,
			output2: false,
			output3: false,
			output4: false,
			selecteditem: '',
			data: null,
			filteredData: null,
			pageOfData: [],
			error: '',
		}
	},
	created() {
		this.getAll()
	},
	methods: {
		getAll() {
			accountService.getAll().then(
				(data) => {
					// this.$store.commit('data/savedata', data)
					this.data = data
				},
				(error) => {
					this.error = error
				}
			)
		},
		onChangePage(pageOfItems) {
			this.pageOfData = pageOfItems
		},
		selectType(type) {
			this.getMembersOfType(type)
			if (type === 2) {
				this.output1 = true
				this.output2 = false
				this.output3 = false
				this.output4 = false
			} else if (type === 3) {
				this.output1 = false
				this.output2 = true
				this.output3 = false
				this.output4 = false
			} else if (type === 8) {
				this.output1 = false
				this.output2 = false
				this.output3 = true
				this.output4 = false
			}
		},
		getMembersOfType(type) {
			let temp = []
			temp = this.data.filter(function (d) {
				// eslint-disable-next-line eqeqeq
				return d.member_type_id == type
			})
			this.filteredData = temp
		},
		setAccountId(id) {
			this.getOne(id)
			this.output1 = false
			this.output2 = false
			this.output3 = false
			this.output4 = true
		},
		getOne(id) {
			accountService.getOne(id).then(
				(data) => {
					this.account = data
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
			title: 'Our Members',
		}
	},
}
</script>

<style lang="scss" scoped>
.modal-header {
	background-color: #eeeeee;
}
.output {
	background-color: whitesmoke;
	margin-top: 1rem;
	padding: 2rem;
}
.my-card {
	text-align: center;
	padding: 1rem;
}
</style>
