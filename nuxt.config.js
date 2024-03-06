export default {
	ssr: false,
	target: "static",
	components: true,
	/*
	 ** Headers of the page
	 */
	head: {
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				name: "description",
				content: "Play rugby for the Canisius College Rugby Club team",
			},
			{
				name: "keywords",
				content: "rugby club, buffalo, new york rugby team, play rugby, rugby",
			},
			{ name: "author", content: "The Canisius College Rugby Club" },
			{
				hid: "og:image",
				property: "og:image",
				content: "/_img/?.png",
			},
			{
				hid: "og:site_name",
				property: "og:site_name",
				content: "Canisius Rugby News",
			},
			{
				hid: "og:description",
				property: "og:description",
				content: "Click here to get the full story",
			},
			{
				hid: "og:title",
				property: "og:title",
				content: "Latest News from the Canisius Rugby Club",
			},
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: "#00F" },
	/*
	 ** Global CSS
	 */
	css: [],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		"~/plugins/jw-vue-pagination",
		"~/plugins/vue-country-region-select",
		"~/plugins/vue-simple-alert",
		"~/plugins/VueYouTubeEmbed",
		"~/plugins/vue-js-modal",
	],
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [
		// Doc: https://github.com/nuxt-community/eslint-module
		["@nuxtjs/moment", { defaultTimezone: "America/New_York" }],
		[
			"@nuxtjs/google-analytics",
			{
				id: "UA-77520982-1",
			},
		],
	],
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		"bootstrap-vue/nuxt",
		"@nuxtjs/axios",
		"nuxt-vue-select",
		"vue-social-sharing/nuxt",
		[
			"nuxt-log",
			{
				// optional : defaults to true if not specified
				isEnabled: true,
				// required ['debug', 'info', 'warn', 'error', 'fatal']
				logLevel: "debug",
				// optional : defaults to false if not specified
				stringifyArguments: false,
				// optional : defaults to false if not specified
				showLogLevel: false,
				// optional : defaults to false if not specified
				showMethodName: false,
				// optional : defaults to '|' if not specified
				separator: "|",
				// optional : defaults to false if not specified
				showConsoleColors: false,
			},
		],
	],
	bootstrapVue: {
		icons: true, // Install the IconsPlugin (in addition to BootStrapVue plugin
	},
	/*
	 ** Axios module configuration
	 ** See https://axios.nuxtjs.org/options
	 */
	axios: {
		baseURL: "https://api.canisiusrugby.org.net/api",
		https: true,
	},
	/*
	 ** Build configuration
	 */
	/*
	 ** You can extend webpack config here
	 */
	build: {
		babel: {
			plugins: [
				[
					"component",
					{
						libraryName: "maz-ui",
						styleLibraryName: "css",
					},
				],
			],
		},
		extend(config, ctx) {},
	},
};
