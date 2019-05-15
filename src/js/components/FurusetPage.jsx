import React from 'react';
import PropTypes from 'prop-types';

import ReactModal from 'react-modal';

import { Furuset } from '../models/timetables';

import NextBus from './NextBus';
import AllBusses from './AllBusses';

class FurusetPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalIsOpen: false,
		};
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}


	render() {
		const { props } = this;
		const { lang, localizedTextTable, time } = props;

		return (
			<div>
				<h2>{localizedTextTable.title} Furuset</h2>
				<NextBus destination="Sentrum" store={Furuset} direction="from" localizedTextTable={localizedTextTable} />
				<button className="button-primary" onClick={this.openModal}>{localizedTextTable.departure}</button>
				<ReactModal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					contentLabel="Furuset Timetable"
					>
					<button className="close" onClick={this.closeModal}>×</button>
					<h4>All departures from Furuset</h4>
					<AllBusses store={Furuset} direction="from" />
				</ReactModal>
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
