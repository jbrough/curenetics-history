import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const GleasonDropdown = (props) => {
	const txts = [
		"I don't know",
		"Gleason Group I (or Gleason 6)",
		"Gleason Group II (or Gleason 3 + 4 or 7)",
		"Gleason Group III (or Gleason 4 + 3 or 7)",
		"Gleason Group IV (or Gleason 8)",
		"Gleason Group V (or Gleason 9 or 10)"
	]

	const opts = txts.map((t, i) => (
		{ key: 'gleason'+i, value: i === 0 ? 'no' : i, text: t }
	))

	let v = 'no'
	if (props.selected) {
		v = props.selected
	}

	return (
  	<Dropdown
			placeholder='Please select'
			value={v}
			selection
			onChange={(_, { value }) => props.onSelect(value)}
			options={opts} />
	)
}

export default GleasonDropdown
