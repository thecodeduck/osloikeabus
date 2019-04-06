import React from 'react';
import PropTypes from 'prop-types';

import { Furuset, Slependen } from '../models/timetables';

class NextBus extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	time: new Date(),
		// };
	}

	// componentDidMount() {
	// 	this.timerID = setInterval(() => this.tick(), 60000);
	// }
	//
	// componentWillUnmount() {
	// 	clearInterval(this.timerID);
	// }
	//
	// tick() {
	// 	this.setState({
	// 		time: new Date(),
	// 	});
	// }

	render() {
		const { props } = this;
		const { lang, time, localizedTextTable } = props;

		function getNextBus(schedule) {
			let upcoming;
			const currentTime = `${time.getHours()}.${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`;
			console.log(currentTime);
			const weekday = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(time);
			console.log(weekday);
			switch (weekday) {
				case 'Sun': {
					upcoming = 'Closed';
					break;
				}
				case 'Sat': {
					for (let i = 0; i < schedule.toSat.length; i++) {
						if (Number(currentTime) < schedule.toSat[i]) {
							upcoming = schedule.toSat[i].toFixed(2);
							break;
						}
					}
					break;
				}
				default: {
					for (let i = 0; i < schedule.toSat.length; i++) {
						if (Number(currentTime) < schedule.to[i]) {
							upcoming = schedule.to[i].toFixed(2);
							break;
						}
					}
					break;
				}
			}
			return upcoming;
		}

		return (
			<div>
				<h4>{this.props.localizedTextTable.to.Furuset}: {getNextBus(Furuset)}</h4>
				<h4>{this.props.localizedTextTable.to.Slependen}: {getNextBus(Slependen)}</h4>
			</div>
		);
	}
}

NextBus.propTypes = {
	lang: PropTypes.string,
	localizedTextTable: PropTypes.shape({
		to: PropTypes.shape({
			Furuset: PropTypes.string,
			Slependen: PropTypes.string,
		}),
		intro: PropTypes.string,
	}),
};

export default NextBus;
