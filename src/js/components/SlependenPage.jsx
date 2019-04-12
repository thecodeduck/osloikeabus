import React from 'react';
import PropTypes from 'prop-types';

import { Slependen } from '../models/timetables';

import NextBus from './NextBus';

class SlependenPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { props } = this;
		const { lang, localizedTextTable, time } = props;

		return (
			<div className="row">
				<div className="one-half column" >
					<h1>Slependen</h1>
					<NextBus destination="Sentrum" store={Slependen} direction="from" localizedTextTable={localizedTextTable} />
					<a href="">Fred Olsens gate 5</a>
					<a href="">See all departure times</a>
				</div>
				<div className="one-half column">
					<div>
						<p>{localizedTextTable.intro}</p>
					</div>
				</div>
			</div>
		);
	}
}

SlependenPage.propTypes = {
	lang: PropTypes.string,
	localizedTextTable: PropTypes.shape({
		title: PropTypes.string,
		intro: PropTypes.string,
	}),
};

export default SlependenPage;
