import React from 'react';
import ReactDOM from 'react-dom';

class Preview extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		
		if (this.props.show==true) {
			
			return (
					<div>
						<br/>
						<div className="alert alert-info">
							<strong>Preview: </strong>{this.props.body}. {this.props.smsUrl}
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

export default Preview;