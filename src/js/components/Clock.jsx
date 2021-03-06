import React from 'react';
import PropTypes from 'prop-types';

class Clock extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	time: new Date(),
		// };
	}

	// componentDidMount() {
	// 	this.timerID = setInterval(() => this.tick(), 1000);
	// }
	//
	// componentWillUnmount() {
	// 	clearInterval(this.timerID);
	// }
	//
	// tick() {
	// 	this.setState({
	// 		time: new Date(),
	// 	});
	// }

	render() {
		const { props } = this;
		const { lang, time } = props;
		return (
			<div>
				<h2 className="clock">{time.toLocaleTimeString('nb', { hour: '2-digit', minute: '2-digit' })}</h2>
				<p className="clockdate">{new Intl.DateTimeFormat(lang, { weekday: 'long', month: 'long', day: 'numeric' }).format(time)}</p>
			</div>
		);
	}
}

Clock.propTypes = {
	lang: PropTypes.string,
};

export default Clock;
