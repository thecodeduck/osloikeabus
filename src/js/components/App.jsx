/* eslint no-eval: "warn" */

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { chooseStore, closeModal, changeLang } from '../actions/userAction';
import Clock from './Clock';
import NextBus from './NextBus';

class App extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	time: new Date(),
		// };
		this.onChooseStore = this.onChooseStore.bind(this);
		this.onChangeLang = this.onChangeLang.bind(this);
		this.modalButton = this.modalButton.bind(this);
	}
	onChooseStore(evt) {
		//eslint-disable-next-line
		this.props.onChooseStore(evt.target.name);
	}
	onChangeLang(evt) {
		//eslint-disable-next-line
		this.props.onChangeLang(evt.target.name);
	}
	modalButton(evt) {
		//eslint-disable-next-line
		this.props.modalButton(evt);
	}

	render() {
		let modalStyle;
		if (this.props.modalShown) {
			modalStyle = { display: 'block' };
		} else {
			modalStyle = { display: 'none' };
		}

		return (
			<div className="container">
				<div className="row">
					<div className="one-third column" >
						<button name="en" onClick={this.onChangeLang}>en</button>
						<button name="nb" onClick={this.onChangeLang}>no</button>
						<h4>{this.props.localizedTextTable.title}</h4>
						<p>{this.props.localizedTextTable.intro}</p>
						<a href="https://goo.gl/maps/cy6kd5GWtGD2" target="_blank" rel="noopener noreferrer">See departure on Google Maps</a>
					</div>
					<div className="two-thirds column">
						<div>
							<Clock lang={this.props.lang} />
							<NextBus lang={this.props.lang} localizedTextTable={this.props.localizedTextTable} />
							<button name="Furuset" className="button-primary" onClick={this.onChooseStore} disabled={this.props.modalShown}>Furuset</button>
							<button name="Slependen" className="button-primary" onClick={this.onChooseStore} disabled={this.props.modalShown}>Slependen</button>
						</div>
					</div>
					<dialog style={modalStyle} id="modal">
						<p>{this.props.modalText}</p>
						<button onClick={this.modalButton}>Close</button>
					</dialog>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	lang: state.lang,
	localizedTextTable: state.localizedTextTable,
	modalShown: state.modal.shown,
	modalText: state.modal.text,
});

const mapActionsToProps = {
	onChooseStore: chooseStore,
	onChangeLang: changeLang,
	modalButton: closeModal,
};

App.propTypes = {
	lang: PropTypes.string,
	localizedTextTable: PropTypes.shape({
		title: PropTypes.string,
		intro: PropTypes.string,
	}),
	modalShown: PropTypes.bool,
	modalText: PropTypes.string,
};

export default connect(mapStateToProps, mapActionsToProps)(App);
