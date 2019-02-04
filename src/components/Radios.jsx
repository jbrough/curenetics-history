/* eslint-disable */

import React from 'react'
import { Radio, List, Container } from 'semantic-ui-react'

class RadioSelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
			name: props.name,
			selected: props.selected,
    }

    this.onChange = this.onChange.bind(this)
  }

	componentWillReceiveProps(props) {
		if (props.name != this.state.name) {
			this.setState({
				name: props.name,
				value: null,
				selected: props.selected,
			})
		}
	}

	onChange (e, { value }) {
    this.setState(
      { value, selected: value },
      () => {
        this.props.onSelect(value)
      }
    )
  }

	radio(k, v, current_v) {
    return (
      <List.Item>
				<Radio
					style={{
						fontWeight: 'bold', fontSize: '1em', padding: '0 1em'
					}}
					key={this.props.name+v}
					label={k}
					value={v}
					checked={current_v || this.state.selected === v || this.state.value === v }
					onChange={this.onChange}
				/>
      </List.Item>
    )
  }

  render () {
    const {
			options,
			selected
		} = this.props

		return (
			<Container>
				<List>
					{ Object.keys(options).map(k => {

						return (
							this.radio(k, options[k], options[k] == selected)
						)
					})}
				</List>
			</Container>
		)
  }
}

export default RadioSelect
