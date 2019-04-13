import React from 'react';
import PropTypes from 'prop-types';

import { Furuset, Slependen } from '../models/timetables';

class AllBusses extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { props, state } = this;
		const { localizedTextTable, store, direction } = props;

		function correctTime(arg) {
			return (
					arg.toFixed(2).replace('.', ':')
			);
		}

		function getAllBusses(schedule, direction) {
			return (
					schedule[direction].map(arg => <li> {correctTime(arg)} </li>)
			);
		}

		function getAllBussesSat(schedule, direction) {
			const satDirection = `${direction}Sat`;
			return (
					schedule[satDirection].map(arg => <li> {correctTime(arg)} </li>)
			);
		}
		return (
			<React.Fragment>
				<div className="row timetable">
					<div className="three columns offset-by-three">
						<p>Man-fre</p>
						<ul>
							{getAllBusses(store, direction)}
						</ul>
					</div>
					<div className="three columns">
						<p>Lørdager</p>
						<ul>
							{getAllBussesSat(store, direction)}
						</ul>
					</div>
				</div>
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
