export function AmPm(datestring) {
	const timearray = datestring.split(':')
	const hours = parseInt(timearray[0])
	const AmOrPm = hours >= 12 ? 'pm' : 'am'
	const hours12 = hours > 12 ? hours % 12 : hours
	const minutes = timearray[1]
	return hours12 + ':' + minutes + ' ' + AmOrPm
}

export function sendNowLater(t) {
	t.$modal.show('dialog', {
		title: 'Do you want to send now or later',
		text: '',
		buttons: [
			{
				title: 'Save and Send Now',
				handler: () => {
					t.addNewsletter('sendNow')
				},
			},
			{
				title: 'Save and Send Later',
				default: true, // Will be triggered by default if 'Enter' pressed.
				handler: () => {
					t.addNewsletter('sendLater')
				},
				// Button click handler
			},
			{
				title: 'Cancel',
				handler: () => {
					t.submitStatus = ''
					t.$modal.hide('dialog')
				},
			},
		],
	})
}

export function makeSeasonLabel(year1, year2) {
	return year1.format('YYYY') + ' Fall  -> ' + year2.format('YYYY') + ' Spring '
}

export function getPerms(t) {
	const user = JSON.parse(sessionStorage.getItem('auth'))
	const temp = user.perms
	const perms = temp.find((u) => u.admin_app_name === t.app)
	if (perms.admin_perm === 3) {
		t.editable = true
		t.addable = true
		t.deleteable = true
		t.statusable = true
	} else if (perms.admin_perm === 2) {
		t.addable = true
	} else if (perms.admin_perm === 1) {
		t.viewable = true
	} else {
		t.$router.push('/admin')
	}
}

export function handleSuccess(response) {
	return response.data
}

export function handleError(error) {
	error =
		(error.response.data && error.response.data.message) ||
		error.response.statusText
	return Promise.reject(error) // assigned to alert / error instead when authentication
}

export function getGameLevelCode(stat) {
	const Year = this.$moment(stat.date).format('YYYY')
	let level = ''
	if (Year === 2007 || Year === 2008 || Year === 2009 || Year === 2011) {
		if (stat.game_level === 'A') {
			level = 'D1'
		} else if (stat.game_level === 'B') {
			level = 'D3'
		} else {
			level = stat.game_level
		}
	} else if (Year === 2010 || Year === 2013 || Year === 2014 || Year === 2015) {
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
}
