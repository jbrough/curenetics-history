// @flow
import {get} from 'api/utils'
import agent from 'superagent'

const DATA_API_URL = 'http://35.189.233.103:8090/data'

export async function OutcodeAPI (postcode: string) {
	let uri = /outcodes/ + postcode
	if (DATA_API_URL !== '') {
		uri = DATA_API_URL + uri
	}

	return get(uri)
}

export function StudiesAPI (
	{outcode, miles, gender, age, seq, cb}
) {
	let uri = `/trials/uk/${outcode}/${miles}/${gender}/${age}/.json`

	if (DATA_API_URL !== '') {
		uri = DATA_API_URL + uri
	}

	return agent.get(uri).set('Accept', 'application/json')
		.end((err, res) => {
			res.seq = seq
			return cb(err, res)
		})

}
