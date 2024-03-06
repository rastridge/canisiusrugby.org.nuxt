/* eslint-disable vue/no-v-html */
<template>
	<div class="Officers">
		<common-header title="Officers" />
		<span v-if="error" class="text-danger">ERROR: {{ error }}</span>
		<loading v-if="!data" />
		<div v-else>
			<div class="row">
				<div class="col-sm-12 offset-lg-2 col-lg-8">
					<div v-if="data" class="news-frame">
						<div class="table-responsive">
							<table class="table table-sm text-nowrap">
								<thead>
									<tr>
										<th></th>
										<th>Office1</th>
										<th>Office2</th>
										<th class="w-25">&nbsp;</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="item in data" :key="item.id">
										<td>
											{{ item.title }}
										</td>
										<td>
											{{ item.office }}
										</td>
										<td>
											{{ item.office2 }}
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
			</div>
		</div>
	</div>
</template>

<script>
import CommonHeader from '@/components/parts/commonHeader.vue'
import { accountService } from '@/services'
import loading from '@/components/parts/loading'
import ExposeEmail from '@/components/parts/ExposeEmail'

export default {
	name: 'Officers',
	components: {
		CommonHeader,
		loading,
		ExposeEmail,
	},
	data() {
		return {
			data: null,
			error: '',
		}
	},
	created() {
		this.getOfficers()
	},
	methods: {
		getOfficers() {
			accountService.getOfficers().then(
				(data) => {
					this.data = data
				},
				(error) => {
					this.error = error
				}
			)
		},
	},
	head() {
		return {
			title: 'Officers of the Club',
		}
	},
}
</script>
