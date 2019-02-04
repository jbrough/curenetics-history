import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const PSADropdown = (props) => {
	const opts = [
		{ key: 'psa:-1', value: 'no', text: `Unknown PSA` }
	]

	for (let i = 0; i <= 19.5;) {
		if (i < 10) {
		  i += 0.25
		} else if (i >= 10) {
			i += 0.5
		}

		opts.push(
			{ key: 'psa:'+i, value: i, text: `${i} ng/mL` }
		)
	}

	opts.push(
		{ key: 'psa:>20', value: 99, text: `Greater than 20 ng/mL` }
	)

	let v = 'no'

	if (props.selected) {
		v = props.selected
	}

	return (
  	<Dropdown
			placeholder='PSA level'
	    onChange={(_, { value }) => props.onSelect(value)}
			selection
			search
			value={v}
			options={opts} />
	)
}

export default PSADropdown
