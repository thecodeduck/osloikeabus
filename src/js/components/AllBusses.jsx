import React from 'react';
import PropTypes from 'prop-types';

import { Furuset, Slependen } from '../models/timetables';

class AllBusses extends React.Component {
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

	renderTimes(arg) {
		return (
			<React.Fragment>
				<li>{arg.toFixed(2).replace('.', ':')}</li>
			</React.Fragment>
		);
	}

	render() {
		const { props, state } = this;
		const { localizedTextTable, store, direction } = props;
		const { time } = state;

		function getAllBusses(schedule, direction) {
			let scheduleRender;
			const weekday = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(time);
			// console.log(weekday);
			switch (weekday) {
				case 'Sun': {
					return localizedTextTable.closed;
				}
				case 'Sat': {
					const satDirection = `${direction}Sat`;
					return (
							schedule[satDirection].map(arg => <li> {arg.toFixed(2).replace('.', ':')} </li>)
					);
				}
				default: {
					console.log(schedule, direction);
					return (
							schedule[direction].map(arg => <li> {arg.toFixed(2).replace('.', ':')} </li>)
					);
				}
			}
		}

		return (
			<React.Fragment>
				<ul>
					{getAllBusses(store, direction)}
				</ul>
			</React.Fragment>
		);
	}
}

AllBusses.propTypes = {
	localizedTextTable: PropTypes.shape({
		to: PropTypes.shape({
			Furuset: PropTypes.string,
			Slependen: PropTypes.string,
		}),
		intro: PropTypes.string,
	}),
};

export default AllBusses;
