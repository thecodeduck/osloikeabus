/* eslint no-eval: "warn" */

import React from 'react';
import PropTypes from 'prop-types';

import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';


import { chooseStore, closeModal, changeLang } from '../actions/userAction';
import Clock from './Clock';
import SentrumPage from './SentrumPage';
import FurusetPage from './FurusetPage';
import SlependenPage from './SlependenPage';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: new Date(),
			modalIsOpen: false,
		};
		this.onChooseStore = this.onChooseStore.bind(this);
		this.onChangeLang = this.onChangeLang.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
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
	openModal() {
		this.setState({ modalIsOpen: true });
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}

	tick() {
		this.setState({
			time: new Date(),
		});
	}

	render() {
		const { props } = this;
		const { lang, localizedTextTable } = props;
		const style = {
			float: 'right',
		};

		let modalStyle;
		if (this.props.modalShown) {
			modalStyle = { display: 'block' };
		} else {
			modalStyle = { display: 'none' };
		}

		return (
			<div>
			<header>
				<div className="container">
					<NavLink className="nav button button-primary" exact to="/">Sentrum</NavLink>
					<NavLink className="nav button button-primary" exact to="/Furuset">Furuset</NavLink>
					<NavLink className="nav button button-primary" exact to="/Slependen">Slependen</NavLink>
					<button className="button-primary" style={style} onClick={this.openModal}>{localizedTextTable.language}</button>
				</div>
			</header>
			<div className="container">
					<div className="row">
						<div className="one-third column">
							<Clock lang={lang} time={this.state.time} />
						</div>
						<div className="two-thirds column">
							<Route
								exact
								path="/"
								render={
									() => <SentrumPage lang={lang} localizedTextTable={localizedTextTable} />
								}
								/>
						<Route
							exact
							path="/Furuset"
							render={
								() => <FurusetPage lang={lang} localizedTextTable={localizedTextTable} />
							}
							/>
							<Route
								exact
								path="/Slependen"
								render={
									() => <SlependenPage lang={lang} localizedTextTable={localizedTextTable} />
								}
								/>
						</div>
					</div>
					<div className="row">
						<div className="one-third column">
							<Route
								exact
								path="/"
								render={
									() => <a href="https://goo.gl/maps/cy6kd5GWtGD2" target="_blank" rel="noopener noreferrer"><img className="u-max-full-width" src="map-01.png" alt="map" /></a>
								}
								/>
							<Route
								exact
								path="/Furuset"
								render={
									() => <div />
								}
								/>
							<Route
								exact
								path="/Slependen"
								render={
									() => <div />
								}
								/>
						</div>
						<div className="two-thirds column">
							<p>{localizedTextTable.intro}</p>
						</div>
					</div>
				<footer>
					⚠️ This is a personal project by <a href="https://github.com/thecodeduck/osloikeabus">Codeduck on GitHub</a> and is not affiliated or supported by IKEA Systems. Codeduck is not responsible if you miss your bus!
				</footer>
				<ReactModal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					contentLabel="Choose Language"
					>
					<button className="close" onClick={this.closeModal}>×</button>
					<div className="langCenter">
						<button className="noBorder" name="en" onClick={this.onChangeLang}>English</button>
						<button className="noBorder" name="nb" onClick={this.onChangeLang}>Norsk</button>
						<button className="button-primary"  onClick={this.closeModal}>{localizedTextTable.accept}</button>
					</div>
				</ReactModal>
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
