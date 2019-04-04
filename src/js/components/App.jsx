import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { chooseStore, closeModal } from '../actions/userAction';
import { en, no } from '../models/lang';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: 'en',
		};
		this.onChooseStore = this.onChooseStore.bind(this);
		this.modalButton = this.modalButton.bind(this);
	}
	onChooseStore(evt) {
		//eslint-disable-next-line
		this.props.onChooseStore(evt.target.name);
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
						<h4>{en.title}</h4>
						<p>{en.intro}</p>
					</div>
					<div className="two-thirds column">
						<div>
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
	modalShown: state.modal.shown,
	modalText: state.modal.text,
});

const mapActionsToProps = {
	onChooseStore: chooseStore,
	modalButton: closeModal,
};

App.propTypes = {
	modalShown: PropTypes.bool,
	modalText: PropTypes.string,
};

export default connect(mapStateToProps, mapActionsToProps)(App);
