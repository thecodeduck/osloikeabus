import React from 'react';
import PropTypes from 'prop-types';

import { Furuset, Slependen } from '../models/timetables';

class NextBus extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: new Date(),
		};
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.tick(), 60000);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		this.setState({
			time: new Date(),
		});
	}

	render() {
		const { props, state } = this;
		const { localizedTextTable, store, direction, destination } = props;
		const { time } = state;

		function getNextBus(schedule, direction) {
			let upcoming;
			const currentTime = `${time.getHours()}.${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`;
			// console.log(currentTime);
			const weekday = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(time);
			// console.log(weekday);
			switch (weekday) {
				case 'Sun': {
					upcoming = localizedTextTable.closed;
					break;
				}
				case 'Sat': {
					const satDirection = `${direction}Sat`;
					for (let i = 0; i < schedule[satDirection].length; i++) {
						if (Number(currentTime) < schedule[satDirection][i]) {
							upcoming = schedule[satDirection][i].toFixed(2).replace('.', ':');
							break;
						} else {
							upcoming = localizedTextTable.closed;
						}
					}
					break;
				}
				default: {
					for (let i = 0; i < schedule[direction].length; i++) {
						if (Number(currentTime) < schedule[direction][i]) {
							upcoming = schedule[direction][i].toFixed(2).replace('.', ':');
							break;
						} else {
							upcoming = localizedTextTable.closed;
						}
					}
					break;
				}
			}
			return upcoming;
		}

		return (
			<React.Fragment>
				<h1>{getNextBus(store, direction)}</h1>
				<h4>{localizedTextTable.to} {destination}</h4>
			</React.Fragment>
		);
	}
}

NextBus.propTypes = {
	localizedTextTable: PropTypes.shape({
		to: PropTypes.shape({
			Furuset: PropTypes.string,
			Slependen: PropTypes.string,
		}),
		intro: PropTypes.string,
	}),
};

export default NextBus;
