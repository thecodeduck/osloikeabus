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
			<div>
				<h2>Slependen</h2>
				<NextBus destination="Sentrum" store={Slependen} direction="from" localizedTextTable={localizedTextTable} />
				<a href="">See all departure times</a>
				<a href="https://www.ikea.com/no/no/stores/slependen/" className="button button-primary" target="_blank" rel="noopener noreferrer">Slependen</a>
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
