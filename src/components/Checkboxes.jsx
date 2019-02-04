/* eslint-disable */

import React from 'react'
import { List, Container, Button, Checkbox } from 'semantic-ui-react'

class Checkboxes extends React.Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.onSelect = this.onSelect.bind(this)

		this.state = {}

    Object.keys(this.props.options).forEach(k => {
			let v = false;

			if (this.props.selected) {
				v = this.props.selected[k]
			}

			this.state[this.props.options[k]] = v
    })
  }

  onChange (_, { value, checked }) {
    const obj = {}
    obj[value] = checked

    this.setState(
      Object.assign({}, this.state, obj)
		)
  }

	onSelect() {
		this.props.onSelect(this.state)
	}

	checkbox(k, v) {
    return (
			<List.Item>
				<Checkbox
					style={{
						fontWeight: 'bold', fontSize: '1em', padding: '0 1em'
					}}
					label={k}
					key={k+v}
					name={k}
					value={v}
					checked={this.state[v]}
					onChange={this.onChange}
				/>
			</List.Item>
    )
  }

  render () {
    const {
			options,
		} = this.props
		return (
			<Container>
				<List>
          { Object.keys(options).map(k => {
            return (
              this.checkbox(k, options[k])
            )
				  })}
				</List>
				<Button onClick={this.onSelect}>
					Next
				</Button>
			</Container>
    )
  }
}

export default Checkboxes
