<template>
	<div id="loginpage">
		<div class="container">
			<div class="row">
				<div class="col-sm-4 offset-sm-4">
					<div v-if="alert.message" :class="`alert ${alert.type}`">
						{{ alert.message }}
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-12 offset-sm-3 col-sm-6 offset-md-4 col-md-4">
					<div v-if="!isLoggedIn">
						<h3 class="headline">Login Admin User</h3>
						<form @submit.prevent="handleSubmit">
							<div class="form-group">
								<label for="username">Username</label>
								<input
									v-model="username"
									type="text"
									name="username"
									class="form-control"
									:class="{ 'is-invalid': submitted && !username }"
								/>
								<span v-show="submitted && !username" class="error"
									>Username is required</span
								>
							</div>
							<div class="form-group">
								<label htmlFor="password">Password</label>
								<input
									v-model="password"
									type="password"
									name="password"
									class="form-control"
									:class="{ 'is-invalid': submitted && !password }"
								/>
								<span v-show="submitted && !password" class="error"
									>Password is required</span
								>
							</div>
							<div class="form-group">
								<button class="btn btn-primary" :disabled="loggingIn">
									Login
								</button>
							</div>
						</form>
						<router-link
							to="/admin/resetpassword"
							tag="a"
							active-class="active"
							exact
							><a>Forgot password?</a></router-link
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			password: '',
			submitted: false,
		}
	},
	computed: {
		loggingIn() {
			return this.$store.state.authentication.status.loggingIn
		},
		alert() {
			return this.$store.state.alert
		},
		isLoggedIn() {
			return !!this.$store.state.authentication.user
		},
	},
	watch: {
		$route(to, from) {
			// clear alert on location change
			this.$store.dispatch('alert/clear')
		},
	},

	methods: {
		handleSubmit(e) {
			this.submitted = true
			const { username, password } = this
			const { dispatch } = this.$store
			if (username && password) {
				dispatch('authentication/login', { username, password })
			}
		},
	},
}
</script>
