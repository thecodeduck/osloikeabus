/* eslint no-eval: "warn" */

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';


import { chooseStore, closeModal, changeLang } from '../actions/userAction';
import Clock from './Clock';
import Sentrum from './Sentrum';


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
				<NavLink exact to="/">Main</NavLink>
					<div className="row">
						<button name="en" onClick={this.onChangeLang}>en</button>
						<button name="nb" onClick={this.onChangeLang}>no</button>
						<Clock lang={lang} time={this.state.time} />
					</div>
				<div className="content">
					<Route exact path="/">
						<Sentrum lang={lang} localizedTextTable={localizedTextTable} />
					</Route>
				</div>
				<dialog style={modalStyle} id="modal">
					<button onClick={this.modalButton}>X</button>
					<p>{this.props.modalText}</p>
				</dialog>
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
