import React from 'react';
import PropTypes from 'prop-types';

import ReactModal from 'react-modal';

import { chooseStore } from '../actions/userAction';
import { Furuset, Slependen } from '../models/timetables';

import NextBus from './NextBus';
import AllBusses from './AllBusses';

class SentrumPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalIsOpen: {
				furuset: false,
				slependen: false,
			},
		};
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal(name) {
		this.setState({
			modalIsOpen: {
				[name]: true,
			},
		});
	}

	closeModal(name) {
		this.setState({
			modalIsOpen: {
				[name]: false,
			},
		});
	}

	render() {
		const { props } = this;
		const { lang, localizedTextTable, time } = props;

		return (
			<div>
				<NextBus destination="IKEA Furuset" store={Furuset} direction="to" localizedTextTable={localizedTextTable} />
				<button className="button-primary" onClick={() => this.openModal('furuset')}>{localizedTextTable.departure}</button>
				<ReactModal
					isOpen={this.state.modalIsOpen.furuset}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={() => this.closeModal('furuset')}
					contentLabel="Furuset Timetable"
					>
					<button className="close" onClick={() => this.closeModal('furuset')}>×</button>
					<h4>All departures to Furuset</h4>
					<AllBusses store={Furuset} direction="to" />
				</ReactModal>

				<NextBus destination="IKEA Slependen" store={Slependen} direction="to" localizedTextTable={localizedTextTable} />
				<button className="button-primary" onClick={() => this.openModal('slependen')}>{localizedTextTable.departure}</button>
				<ReactModal
					isOpen={this.state.modalIsOpen.slependen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={() => this.closeModal('slependen')}
					contentLabel="Slependen Timetable"
					>
					<button className="close" onClick={() => this.closeModal('slependen')}>×</button>
						<h4>All departures to Slependen</h4>
					<AllBusses store={Slependen} direction="to" />
				</ReactModal>

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
