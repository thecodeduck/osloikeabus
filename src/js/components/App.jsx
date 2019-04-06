/* eslint no-eval: "warn" */

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { chooseStore, closeModal, changeLang } from '../actions/userAction';
import TIMETABLES from '../models/timetables';
import Clock from './Clock';
import NextBus from './NextBus';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: new Date(),
		};
		this.onChooseStore = this.onChooseStore.bind(this);
		this.onChangeLang = this.onChangeLang.bind(this);
		this.modalButton = this.modalButton.bind(this);
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.tick(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
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

	tick() {
		this.setState({
			time: new Date(),
		});
	}

	render() {
		const { props } = this;
		const { lang, localizedTextTable } = props;

		let modalStyle;
		if (this.props.modalShown) {
			modalStyle = { display: 'block' };
		} else {
			modalStyle = { display: 'none' };
		}

		return (
			<div className="container">
				<div className="row">
					<div className="one-half column" >
						<div className="row">
							<button name="en" onClick={this.onChangeLang}>en</button>
							<button name="nb" onClick={this.onChangeLang}>no</button>
							<Clock lang={lang} time={this.state.time} />
						</div>
						<h1>{localizedTextTable.title}</h1>
						<NextBus lang={lang} time={this.state.time} localizedTextTable={localizedTextTable} />
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
					<dialog style={modalStyle} id="modal">
						<button onClick={this.modalButton}>X</button>
						<p>{this.props.modalText}</p>
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
