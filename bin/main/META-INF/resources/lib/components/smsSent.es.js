import React from 'react';
import ReactDOM from 'react-dom';

class SmsSent extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		
		if (this.props.smsSent==true) {
			
			return (
					<div>
						<br/>
						<div className="alert alert-success">
							<strong>SMS: </strong>The SMS was sent. Please check your device}
						</div>
					</div>
			);
		} 
		else {
			
			return(
					<div>&nbsp;</div>
			);
		}
		
	}
}

export default SmsSent;