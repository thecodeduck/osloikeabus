import React from 'react';
import PropTypes from 'prop-types';

import { chooseStore, closeModal, changeLang } from '../actions/userAction';
import TIMETABLES from '../models/timetables';
import NextBus from './NextBus';

class Sentrum extends React.Component {
	constructor(props) {
		super(props);
		this.onChooseStore = this.onChooseStore.bind(this);
		this.onChangeLang = this.onChangeLang.bind(this);
	}

	onChooseStore(evt) {
		//eslint-disable-next-line
		this.props.onChooseStore(evt.target.name);
	}
	onChangeLang(evt) {
		//eslint-disable-next-line
		this.props.onChangeLang(evt.target.name);
	}

	render() {
		const { props } = this;
		const { lang, localizedTextTable, time } = props;

		return (
			<div className="row">
				<div className="one-half column" >
					<h1>{localizedTextTable.title}</h1>
					<NextBus lang={lang} localizedTextTable={localizedTextTable} />
					<div className="row">
						<a href="https://www.ikea.com/no/no/stores/slependen/" className="button button-primary" target="_blank" rel="noopener noreferrer">Slependen</a>
						<a href="https://www.ikea.com/no/no/stores/furuset/" className="button button-primary" target="_blank" rel="noopener noreferrer">Furuset</a>
					</div>
					<p>
						⚠️ This is a personal project by <a href="https://github.com/thecodeduck/osloikeabus">Codeduck on GitHub</a> and is not affiliated or supported by IKEA Systems. Codeduck is not responsible if you miss your bus!
					</p>
				</div>
				<div className="one-half column">
					<div>
						<p>{localizedTextTable.intro}</p>
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

const mapActionsToProps = {
	onChooseStore: chooseStore,
	onChangeLang: changeLang,
};

Sentrum.propTypes = {
	lang: PropTypes.string,
	localizedTextTable: PropTypes.shape({
		title: PropTypes.string,
		intro: PropTypes.string,
	}),
};

export default Sentrum;