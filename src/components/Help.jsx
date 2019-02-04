import React from 'react'
import { Feed, Message } from 'semantic-ui-react'

const Help = (props) => {
	let msg

	if (props.text) {
		msg = (
			<Feed.Extra text>
				{ props.text }
			</Feed.Extra>
		)
	} else if (props.msg) {
		msg = (
			<Feed.Extra>
				{ props.msg }
			</Feed.Extra>
		)
	}

	return (
		<Message>
			<Feed>
				<Feed.Event>
					<Feed.Label>
					</Feed.Label>
					<Feed.Content>
						<Feed.Summary>
							Help from our specialist
						</Feed.Summary>
						{ msg }
					</Feed.Content>
				</Feed.Event>
			</Feed>
		</Message>
	)
}

export default Help
