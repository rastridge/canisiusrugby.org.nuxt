<template>
	<div class="add">
		<common-header title="Register" />

		<!-- Modal -->
		<b-modal id="my-modal" button-size="sm">
			<template v-slot:modal-header>
				<h3>Thank you for considering the Canisius College Rugby Club</h3>
				<div class="w-100">
					<b-button
						variant="primary"
						size="sm"
						class="float-right"
						@click="hideModal('my-modal')"
					>
						Close
					</b-button>
				</div>
			</template>
			<template>
				<p>
					Registering is an expression of interest in being informed of the club
					activities and does not imply any commitment financially or otherwise.
					Just come to practice and see if we're right for you.
				</p>

				<p>
					To be a full time member eligible to play in sanctioned USA Rugby
					competitions you will be required to:
				</p>
				<ul>
					<li>Become a member of USA Rugby $</li>
					<li>Practice 2 hours twice a week</li>
					<li>Have the ability to play on weekends to travel to away games</li>
				</ul>
				<p>
					We love our sport. We take our preparation seriously and play hard.
					Join us.
				</p>
				<p>
					<nuxt-link :to="'/schedule/'"
						><a> See current schedule </a>
					</nuxt-link>
				</p>
			</template>
			<template v-slot:modal-footer>
				<div class="w-100">
					<b-button
						variant="primary"
						size="sm"
						class="float-right"
						@click="hideModal('my-modal')"
					>
						Close
					</b-button>
				</div>
			</template>
		</b-modal>

		<p
			v-if="submitStatus === 'ERROR'"
			:class="{ error: submitStatus === 'ERROR' }"
		>
			Please fill the form correctly.
		</p>
		<form class="form">
			<div class="form-group">
				<div class="col-sm-6 col-md-8">
					<submit-cancel :submitstatus="submitStatus" @dispose="dispose" />
				</div>
			</div>

			<!-- prove yur a human -->
			<div class="form-group">
				<label class="control-label col-sm-6" for="human"
					>Prove you are a human. How much is 3 x 5 ?</label
				>
				<div class="col-sm-3">
					<input
						id="human"
						v-model.trim="human"
						class="form-control"
						@input="setHuman($event.target.value)"
					/>
					<span v-if="!$v.human.required" class="error">Field is required</span>
					<br />
					<span v-if="!$v.human.between" class="error">Bad math</span>
				</div>
			</div>

			<!-- accountname input-->
			<div class="form-group">
				<label class="col-sm-4 control-label" for="member_firstname"
					>First name:
				</label>
				<div class="col-sm-5">
					<b-form-input
						id="member_firstname"
						v-model.trim="member_firstname"
						type="text"
						class="form-control"
						autofocus
						@input="setMember_firstname($event)"
					/>
					<span v-if="!$v.member_firstname.required" class="error"
						>First name Field is required</span
					>
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-4 control-label" for="member_lastname"
					>Last name:
				</label>
				<div class="col-sm-5">
					<input
						id="member_lastname"
						v-model.trim="member_lastname"
						type="text"
						class="form-control"
						@input="setMember_lastname($event.target.value)"
					/>
					<span v-if="!$v.member_lastname.required" class="error"
						>Last name Field is required</span
					>
				</div>
			</div>

			<!-- email input-->
			<div class="form-group">
				<label class="col-sm-4 control-label" for="account_email"
					>Email:
				</label>
				<div class="col-sm-6">
					<input
						id="account_email"
						v-model.trim="account_email"
						type="email"
						class="form-control"
						@input="setEmail($event.target.value)"
					/>
					<span v-if="!$v.account_email.email" class="error"
						>Invalid email</span
					>
					<span v-if="!$v.account_email.required" class="error"
						>Email Field is required</span
					>
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-4 control-label" for="member_nickname"
					>Nickname:
				</label>
				<div class="col-sm-5">
					<input
						id="member_nickname"
						v-model.trim="member_nickname"
						type="text"
						class="form-control"
					/>
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-4 control-label" for="member_position"
					>Position(s)?:
				</label>
				<div class="col-sm-5">
					<input
						id="member_position"
						v-model.trim="member_position"
						type="text"
						class="form-control"
					/>
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-4 control-label" for="member_prev_club"
					>Previous club(s)?:
				</label>
				<div class="col-sm-6">
					<input
						id="member_prev_club"
						v-model.trim="member_prev_club"
						type="text"
						class="form-control"
						@input="setPrevClub($event.target.value)"
					/>
					<!-- <span v-if="!$v.member_prev_club.required" class="error"
						>Previous clubs Field is required</span> -->
				</div>
			</div>

			<!-- street input -->
			<div class="form-group">
				<label class="col-sm-4 control-label" for="account_addr_street"
					>Street:
				</label>
				<div class="col-sm-6">
					<input
						id="account_addr_street"
						v-model.trim="account_addr_street"
						type="text"
						class="form-control"
						@input="setAccount_addr_street($event.target.value)"
					/>
					<span v-if="!$v.account_addr_street.required" class="error"
						>Street Field is required</span
					>
				</div>
			</div>

			<!-- street ext input -->
			<div class="form-group">
				<label class="col-sm-4 control-label" for="account_addr_street_ext"
					>Street Extension:
				</label>
				<div class="col-sm-5">
					<input
						id="account_addr_street_ext"
						v-model.trim="account_addr_street_ext"
						type="text"
						class="form-control"
					/>
				</div>
			</div>

			<!-- city input -->
			<div class="form-group">
				<label class="col-sm-4 control-label" for="account_addr_city"
					>City:
				</label>
				<div class="col-sm-6">
					<input
						id="account_addr_city"
						v-model.trim="account_addr_city"
						type="text"
						class="form-control"
						@input="setAccount_addr_city($event.target.value)"
					/>
					<span v-if="!$v.account_addr_city.required" class="error"
						>Street Field is required</span
					>
				</div>
			</div>

			<!-- country input -->
			<div class="form-group">
				<label class="col-sm-2 control-label" for="account_addr_country"
					>Country:
				</label>
				<div class="col-sm-6">
					<country-select
						id="account_addr_country"
						v-model="account_addr_country"
						:country="account_addr_country"
						top-country="US"
						class="form-control"
						@change="setAccount_addr_country($event)"
					/>
					<span v-if="!$v.account_addr_country.required" class="error"
						>Country Field is required</span
					>
				</div>
			</div>

			<!-- state / region input -->
			<div class="form-group">
				<label class="col-sm-2 control-label" for="account_addr_state"
					>Region / State:
				</label>
				<div class="col-sm-6">
					<region-select
						id="account_addr_state"
						v-model="account_addr_state"
						:country="account_addr_country"
						:region="account_addr_state"
						class="form-control"
						@change="setAccount_addr_state($event.target.value)"
					/>
					<span v-if="!$v.account_addr_state.required" class="error"
						>Region / State Field is required</span
					>
				</div>
			</div>

			<!-- postal input -->
			<div class="form-group">
				<label class="col-sm-4 control-label" for="account_addr_postal"
					>Postal:
				</label>
				<div class="col-sm-4">
					<input
						id="account_addr_postal"
						v-model.trim="account_addr_postal"
						type="text"
						class="form-control"
						@input="setAccount_addr_postal($event.target.value)"
					/>
					<span v-if="!$v.account_addr_postal.required" class="error"
						>Field is required</span
					>
					<span v-if="!$v.account_addr_postal.minLength" class="error"
						>Postal must have at least
						{{ $v.account_addr_postal.$params.minLength.min }} letters.</span
					>
				</div>
			</div>
			<!-- phone input -->
			<div class="form-group">
				<label class="col-md-3 control-label" for="account_addr_phone"
					>Phone:
				</label>
				<div class="col-md-6">
					<MazPhoneNumberInput
						default-phone-number=""
						default-country-code="US"
						show-code-on-list
						@update="setAccount_addr_phone($event)"
					/>
					<span v-if="!$v.account_addr_phone.required" class="error"
						>Valid Phone Number is required</span
					>
				</div>
			</div>

			<!-- phone input
			<div class="form-group">
				<label class="col-sm-4 control-label" for="account_addr_phone"
					>Phone:
				</label>
				<div class="col-sm-4">
					<input
						id="account_addr_phone"
						v-model.trim="account_addr_phone"
						type="text"
						class="form-control"
						@change="setAccount_addr_phone($event.target.value)"
					/>
					<small class="form-text text-muted">With area code</small>
					<br />
					<span v-if="!$v.account_addr_phone.required" class="error"
						>Field is required</span
					>
				</div>
			</div>
 -->
			<!-- show phone -->
			<div class="form-group">
				<label class="col-md-3 control-label" for="member_show_phone"
					>Show phone:</label
				>
				<div class="col-md-3">
					<select
						id="member_show_phone"
						v-model="member_show_phone"
						class="form-control"
					>
						<option disabled value="">Yes or No</option>
						<option value="1">Yes</option>
						<option value="0">No</option>
					</select>
				</div>
			</div>

			<!-- show address -->
			<div class="form-group">
				<label class="col-md-3 control-label" for="member_show_addr"
					>Show address:</label
				>
				<div class="col-md-3">
					<select
						id="member_show_addr"
						v-model="member_show_addr"
						class="form-control"
					>
						<option disabled value="">Yes or No</option>
						<option value="1">Yes</option>
						<option value="0">No</option>
					</select>
				</div>
			</div>

			<!-- sms recip -->
			<div class="form-group">
				<label class="col-md-3 control-label" for="sms_recipient"
					>Text recipient:</label
				>
				<div class="col-md-3">
					<select
						id="sms_recipient"
						v-model="sms_recipient"
						class="form-control"
					>
						<option disabled value="">Yes or No</option>
						<option value="1">Yes</option>
						<option value="0">No</option>
					</select>
				</div>
			</div>

			<!-- Newsletter recipient input-->
			<div class="form-group">
				<label class="col-md-3 control-label" for="newsletter_recipient">
					Receive Newsletter:</label
				>
				<div class="col-md-3">
					<select v-model="newsletter_recipient" class="form-control">
						<option disabled value="">Yes or No</option>
						<option value="1">Yes</option>
						<option value="0">No</option>
					</select>
				</div>
			</div>

			<!-- Password input-->
			<!-- 			<div class="form-group">
				<label class="col-sm-4 control-label" for="account_remind"
					>Password:
				</label>
				<div class="col-sm-4">
					<input
						id="account_remind"
						v-model.trim="account_remind"
						type="password"
						class="form-control"
						@input="setPass($event.target.value)"
					/>
					<span v-if="!$v.account_remind.required" class="error"
						>Field is required</span
					>
					<br />
					<span v-if="!$v.account_remind.minLength" class="error"
						>Password must have at least
						{{ $v.account_remind.$params.minLength.min }} letters.</span
					>
				</div>
			</div>
 -->
			<!-- SameAs Password input-->
			<!-- 			<div class="form-group">
				<label class="col-sm-4 control-label" for="repeatPass"
					>Repeat Password:
				</label>
				<div class="col-sm-4">
					<input
						id="repeatPass"
						v-model.trim="repeatPass"
						type="password"
						class="form-control"
						@input="setRepeatPass($event.target.value)"
					/>
					<span v-if="!$v.repeatPass.required" class="error"
						>Field is required</span
					>
					<br />
					<span v-if="!$v.repeatPass.samePass" class="error"
						>Password do not match</span
					>
				</div>
			</div>
 -->
			<!-- submit  -->
			<div class="form-group">
				<div class="col-sm-6 col-md-8">
					<submit-cancel :submitstatus="submitStatus" @dispose="dispose" />
				</div>
			</div>
		</form>
		<p
			v-if="submitStatus === 'ERROR'"
			:class="{ error: submitStatus === 'ERROR' }"
		>
			Please fill the form correctly.
		</p>
		<p v-if="submitStatus === 'PENDING'">Submitted...</p>
	</div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
	required,
	email,
	minLength,
	sameAs,
	between,
} from 'vuelidate/lib/validators'
import moment from 'moment'
import SubmitCancel from '@/components/parts/SubmitCancel.vue'
import CommonHeader from '@/components/parts/commonHeader.vue'
import { accountService } from '@/services/'
import { MazPhoneNumberInput } from 'maz-ui'
// const phone = require('phone')

export default {
	name: 'Accountadd',
	components: {
		CommonHeader,
		SubmitCancel,
		MazPhoneNumberInput,
	},
	mixins: [validationMixin],
	layout: 'default',
	data() {
		return {
			account_email: '',
			account_remind: '',
			repeatPass: '',
			member_firstname: '',
			member_lastname: '',
			member_nickname: '',

			member_position: '',
			member_prev_club: '',
			member_year: moment().format('YYYY'),
			account_addr_street: '',
			account_addr_street_ext: '',

			account_addr_city: '',
			account_addr_state: '',
			account_addr_country: '',
			account_addr_postal: '',
			account_addr_phone: '',

			member_show_phone: '1',
			member_show_addr: '1',
			newsletter_recipient: '1',
			mail_recipient: '0',
			sms_recipient: '1',
			member_pic_path: '',

			member_wall_of_fame_year: '',
			member_type_id: '9',
			member_type2_id: '',
			member_admin_type_id: '0',
			member_admin_type2_id: '0',

			human: '',
			submitStatus: '',
			error: '',
		}
	},
	validations: {
		human: {
			required,
			between: between(14, 16),
		},
		account_email: {
			required,
			email,
		},
		member_firstname: {
			required,
		},
		member_lastname: {
			required,
		},
		/* 		member_prev_club: {
			required,
		},
 */ account_addr_street: {
			required,
		},
		account_addr_city: {
			required,
		},
		account_addr_state: {
			required,
		},
		account_addr_country: {
			required,
		},
		account_addr_phone: {
			required,
		},
		account_addr_postal: {
			required,
			minLength: minLength(5),
		},
		/* 		account_remind: {
			required,
			minLength: minLength(8),
		},
		repeatPass: {
			required,
			samePass: sameAs('account_remind'),
		},
 */
	},
	mounted() {
		this.showModal('my-modal')
	},
	methods: {
		showModal(id) {
			this.$bvModal.show(id)
		},
		hideModal(id) {
			this.$bvModal.hide(id)
		},
		dispose(e) {
			if (e === 'submit') {
				this.handleSubmit()
			} else if (e === 'cancel') {
				this.$router.push('/news')
			}
		},
		setHuman(value) {
			this.human = value
			this.$v.human.$touch()
		},
		setMember_firstname(value) {
			this.member_firstname = value
			this.$v.member_firstname.$touch()
		},
		setMember_lastname(value) {
			this.member_lastname = value
			this.$v.member_lastname.$touch()
		},
		setEmail(value) {
			this.account_email = value
			this.$v.account_email.$touch()
		},
		setPrevClub(value) {
			this.member_prev_club = value
			// this.$v.member_prev_club.$touch()
		},
		setAccount_addr_street(value) {
			this.account_addr_street = value
			this.$v.account_addr_street.$touch()
		},
		setAccount_addr_city(value) {
			this.account_addr_city = value
			this.$v.account_addr_city.$touch()
		},
		setAccount_addr_state(value) {
			this.account_addr_state = value
			this.$v.account_addr_state.$touch()
		},
		setAccount_addr_country(value) {
			this.account_addr_country = value
			this.$v.account_addr_country.$touch()
		},
		setAccount_addr_postal(value) {
			this.account_addr_postal = value
			this.$v.account_addr_postal.$touch()
		},
		setAccount_addr_phone(value) {
			if (value.isValid) {
				this.account_addr_phone = value.e164
			} else {
				this.account_addr_phone = ''
			}
			this.$v.account_addr_phone.$touch()
		},
		/* 		setPass(value) {
			this.account_remind = value
			this.$v.account_remind.$touch()
		},
		setRepeatPass(value) {
			this.repeatPass = value
			this.$v.repeatPass.$touch()
		},
 */ handleSubmit(
			e
		) {
			this.$v.$touch()
			if (this.$v.$invalid) {
				this.submitStatus = 'ERROR'
			} else {
				// do your submit logic here
				this.submitStatus = 'PENDING'
				const {
					account_email,
					account_remind,
					member_firstname,
					member_lastname,
					member_nickname,
					member_position,
					member_prev_club,
					member_year,
					account_addr_street,
					account_addr_street_ext,
					account_addr_city,
					account_addr_state,
					account_addr_country,
					account_addr_postal,
					account_addr_phone,

					member_show_phone,
					member_show_addr,
					newsletter_recipient,
					mail_recipient,
					sms_recipient,
					member_pic_path,

					member_wall_of_fame_year,
					member_type_id,
					member_type2_id,
					member_admin_type_id,
					member_admin_type2_id,
				} = this
				accountService
					.addOneByRegister(
						account_email,
						account_remind,
						member_firstname,
						member_lastname,
						member_nickname,

						member_position,
						member_prev_club,
						member_year,
						account_addr_street,
						account_addr_street_ext,

						account_addr_city,
						account_addr_state,
						account_addr_country,
						account_addr_postal,
						account_addr_phone,

						member_show_phone,
						member_show_addr,
						newsletter_recipient,
						mail_recipient,
						sms_recipient,
						member_pic_path,

						member_wall_of_fame_year,
						member_type_id,
						member_type2_id,
						member_admin_type_id,
						member_admin_type2_id
					)
					.then((account) => {
						if (!account.error) {
							this.submitStatus = 'OK'
							this.$router.push('/register/ack')
						} else {
							this.submitStatus = 'ERROR'
							this.error = account.error
							this.$router.push('/register/men')
						}
					})
			}
		},
	},
	head() {
		return {
			title: 'Registration',
		}
	},
}
</script>
