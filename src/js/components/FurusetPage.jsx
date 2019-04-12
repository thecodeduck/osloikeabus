import React from 'react';
import PropTypes from 'prop-types';

import { Furuset } from '../models/timetables';

import NextBus from './NextBus';

class FurusetPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { props } = this;
		const { lang, localizedTextTable, time } = props;

		return (
			<div className="row">
				<div className="one-half column" >
					<h1>Furuset</h1>
					<NextBus destination="Sentrum" store={Furuset} direction="from" localizedTextTable={localizedTextTable} />
					<a href="">Fred Olsens gate 5</a>
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

FurusetPage.propTypes = {
	lang: PropTypes.string,
	localizedTextTable: PropTypes.shape({
		title: PropTypes.string,
		intro: PropTypes.string,
	}),
};

export default FurusetPage;
