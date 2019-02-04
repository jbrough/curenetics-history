import React from 'react'
import { List, Loader, Dimmer, Feed, Image, Message, Segment, Divider, Button, Container, Grid, Header, Icon, Input, Label, Popup} from 'semantic-ui-react'

import Radios from './Radios'
import Checkboxes from './Checkboxes'
import Help from './Help'
import PSADropdown from './PSADropdown'
import GleasonDropdown from './GleasonDropdown'

class History extends React.Component {
  constructor(props) {
    super(props)

    this.q = this.props.questions

    this.ask = this.ask.bind(this)
    this.back = this.back.bind(this)

    this.stateHandler = this.stateHandler.bind(this)

    this.state = {
      ids: [this.q.Id()]
		}
  }

	componentDidMount() {
		const path = window.location.pathname
		if (path.indexOf('/history') != -1) {
			const parts = path.split('/')
			if (parts.length === 4) {
				const slug = parts[parts.length-1]
				this.ask(slug)
			}
		}
	}

	setHref() {
		const path = '/history/' + this.q.Slug()
		window.history.pushState(null, null, path)
	}

  ask(slug) {
		if (slug) {
			this.q.GoTo(slug)
		} else {
			let answer = this.state[this.q.Ask().Id()]
			if (answer._next) {
				this.q.Answer('next')
			} else {
				this.q.Answer(answer)
			}
		}
    const ids = this.state.ids.concat([this.q.Id()])
		this.setState({ ids }, () => {
			this.setHref()
		})
  }

  back() {
    const ids = this.state.ids.concat([])
    ids.pop()
    this.q.SetId(ids[ids.length-1])
    this.setState({ ids })
  }

	stateHandler(name, multi) {
    return (v) => {
      const obj = {}
			if (multi) {
				obj[name] = Object.assign({}, v, {_next: true })
			} else {
				obj[name] = v
			}
			this.setState(
        Object.assign({}, this.state, obj, {loading: true}),
				() => {
					console.log(this.state)
					this.props.store.set(obj)
					setTimeout(
					() => {
						this.setState({loading: false})
						this.ask()
					},
					200)
				}
      )
    }
  }

  options() {
    const q = this.q.Ask()

		let el;

		const opts = {}

		const value = this.props.store.get(q.Id())

		const values = q.Values()
		const labels = q.Labels()

		labels.forEach((l,i) => opts[l] = values[i])

		if (q.Label().indexOf('PSA') != -1) {
			el = (
				<PSADropdown
					selected={value}
					onSelect={this.stateHandler(q.Id())}
				/>
			)
		} else if (q.Label().indexOf('Gleason') != -1) {
			el = (
				<GleasonDropdown
					selected={value}
					onSelect={this.stateHandler(q.Id())}
				/>
			)
		} else if (q.IsRadio() ) {
      el = (
				<Radios
					name={q.Id()}
					options={opts}
					selected={value}
					onSelect={this.stateHandler(q.Id())}
        />
      )
    } else if (q.IsMulti()) {
      el = (
        <Checkboxes
					options={opts}
					selected={value}
					onSelect={this.stateHandler(q.Id(), true)}
        />
      )
		}

		return el
  }

	help() {
		let el, txt
		switch (this.q.Ask().Label()) {
			case 'Have you had a biopsy?':
				txt = "A prostate biopsy involves using thin needles to take small samples of tissue from the prostate."
				break
			case 'At what stage is your cancer?':
				el = (
					<List>
						<List.Item>
							<List.Header>
								locally advanced:
							</List.Header>
							<List.Description>
								in the immediate vicinity of the prostate, such as nearby lymph glands, but not spread to other organs
							</List.Description>
						</List.Item>
						<List.Item>
							<List.Header>
								metastatic:
							</List.Header>
							<List.Description>
								spread from the prostate to other organs
							</List.Description>
						</List.Item>
					</List>
				)
				break
		}

		if (el || txt ) {
			return (
				<Help
					text={txt}
					msg={el}
				/>
			)
		}
	}

  render() {
		const active = this.state.loading

		return (
			<div>
				<Dimmer.Dimmable
					style={{ minHeight: '200px'}}
					as={Segment} dimmed={active}
					>
					<Dimmer active={active} inverted>
					  <Loader>Loading</Loader>
					</Dimmer>
					<Container text>
						<Header as='h1'
							style={{ fontWeight: 'normal' }}
						>{this.q.Ask().Label()}</Header>
						{ this.options() }
					</Container>
				</Dimmer.Dimmable>
					{ this.help() }
				<a
					href='#'
					onClick={(e) => {
						e.preventDefault()
						if (this.state.ids.length > 1) this.back()
					}}
				>{'<'} prev</a>
			</div>
		)
  }
}

export default History
