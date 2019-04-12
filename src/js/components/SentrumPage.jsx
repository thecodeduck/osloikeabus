import React from 'react';
import PropTypes from 'prop-types';

import { chooseStore } from '../actions/userAction';
import { Furuset, Slependen } from '../models/timetables';

import NextBus from './NextBus';
import AllBusses from './AllBusses';

class SentrumPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { props } = this;
		const { lang, localizedTextTable, time } = props;

		return (
			<div className="row">
				<div className="one-half column" >
					<h2>{localizedTextTable.title}</h2>
					<NextBus destination="IKEA Furuset" store={Furuset} direction="to" localizedTextTable={localizedTextTable} />
					<NextBus destination="IKEA Slependen" store={Slependen} direction="to" localizedTextTable={localizedTextTable} />
				</div>
				<div className="one-half column">
					<div>
						<a href="https://goo.gl/maps/cy6kd5GWtGD2" target="_blank" rel="noopener noreferrer">
							<img className="u-max-full-width" src="map-01.png" alt="map" />
						</a>
						<a href="https://goo.gl/maps/cy6kd5GWtGD2" target="_blank" rel="noopener noreferrer">Google Maps</a>
						<br />
					</div>
				</div>
			</div>
		);
	}
}

SentrumPage.propTypes = {
	lang: PropTypes.string,
	localizedTextTable: PropTypes.shape({
		title: PropTypes.string,
		intro: PropTypes.string,
	}),
};

export default SentrumPage;
