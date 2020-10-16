import React from 'react';

import ReactDOM from 'react-dom';

import Preview from './components/preview.es.js';
import SmsSent from './components/smsSent.es.js';

class ChannelTesterReact extends React.Component {
	
	constructor(props) {
		super(props);	
		this.state = ({	
						phoneNumber: "",
						parameterKey: "", 
						parameterValue: "", 						
						tag: "",
						body: "",
						smsUrl: "",
						smsSent: false,
						show: false,
						parameters: [],
						tags: []
					 });
		this.handleKeyChange = this.handleKeyChange.bind(this);
		this.handleParameterChange = this.handleParameterChange.bind(this);
		this.handleTagChange = this.handleTagChange.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.doPreview = this.doPreview.bind(this);
		this.addParameters = this.addParameters.bind(this);
		this.addTags = this.addTags.bind(this);
		this.sendSms = this.sendSms.bind(this)
		this.clearVariables = this.clearVariables.bind(this);
		
	}
	
	handleParameterChange(event) {
	  	  this.setState({parameterValue: event.target.value});
	}
	
	handleKeyChange(event) {
	  	  this.setState({parameterKey: event.target.value});
	}
	
	handlePhoneChange(event) {
	  	  this.setState({phoneNumber: event.target.value});
	}
	
	handleTagChange(event) {
	  	  this.setState({tag: event.target.value});
	}
	
	addParameters() {
		var parametersTemp = this.state.parameters;
		parametersTemp.push({ "key": this.state.parameterKey, "value" : this.state.parameterValue });
		this.setState(this.state.parameters = parametersTemp);
	}
	
	doPreview() {
		let queryJson = ({
			  "tags": this.state.tags,
			  "variables": this.state.parameters			
				});
		let queryJsonString = JSON.stringify(queryJson);
		$.ajax({
			url: Liferay.ThemeDisplay.getPortalURL() + "/o/channel-content/v1.0/articleContentByTags?p_auth=" + Liferay.authToken,
			type: "POST",
			contentType: "application/json",
			data: queryJsonString,
			success: function(data) {
				console.log(data);
				this.setState({body : data.body});
				this.setState({smsUrl : data.smsUrl});
				this.setState({show : true});
				
		}.bind(this)});
	}
	
	addTags() {
		var tagsTemp = this.state.tags;
		tagsTemp.push({ "tag" : this.state.tag });
		this.setState(this.state.tags = tagsTemp);
	}
	
	clearVariables() {
		var clearState = []
		this.setState(this.state.tags = clearState);
		this.setState(this.state.parameters = clearState);		
	}
	
	sendSms() {
		let queryJson = ({
			  "tags": this.state.tags,
			  "variables": this.state.parameters			
				});
		let queryJsonString = JSON.stringify(queryJson);
		$.ajax({
			url: "http://localhost:8080/o/channel-content/v1.0/articleContentByTags",
			type: "POST",
			contentType: "application/json",
			data: queryJsonString,
			beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0');},
			success: function(data) {
				console.log(data);
				this.setState({body : data.body});
				this.setState({smsUrl : data.smsUrl});
				this.setState({show : false});
				let bodyEncoded = encodeURIComponent(this.state.body);
				let phoneNumberEncoded = encodeURIComponent(this.state.phoneNumber);
				let returnUrlAndVariable = this.props.sendSms + "&" + this.props.instanceId + "body=" + bodyEncoded + "&" + this.props.instanceId + "to=" + phoneNumberEncoded + "&" + this.props.instanceId + "smsUrl=" + this.state.smsUrl;
				$.ajax({
					url: returnUrlAndVariable,
					type: "GET",
					success: function(data) {
						this.setState({smsSent : false});
						alert("The sms has been sent. Please check your phone.");
																	
					}.bind(this)
				});
				
				
		}.bind(this)});
	}
	
	render() {
		return (
				<div className="container">
					<div className="row">
						<div className="col-sm">
							<div>
							<label htmlFor="parameterKey">Parameter/Variable key</label>
								<input className="field form-control" onChange={this.handleKeyChange} name="parameterKey" type="text" value={this.state.parameterKey}/>
							</div>
							<br/>
							<div>
								<label htmlFor="parameterValue">Parameter/Variable value</label>
								<input className="field form-control" onChange={this.handleParameterChange} name="parameterValue" type="text" value={this.state.parameterValue}/>
							</div>
							<br/>
							<div>
								<button className="btn icon btn-primary" value="submit" onClick={this.addParameters} name="addParameter" type="submit">Add parameter</button>
							</div>
							<br/>
							<div>
								<label htmlFor="tag">Tag</label>
								<input className="field form-control" onChange={this.handleTagChange} name="tag" type="text" value={this.state.tag}/>
							</div>
							<br/>
							<div>
								<button className="btn icon btn-primary" value="submit" onClick={this.addTags} name="addTag" type="submit">Add tag</button>
							</div>
							<br/>
							<div>
								<label htmlFor="phoneNumber">Phone number</label>
								<input className="field form-control" onChange={this.handlePhoneChange} name="phoneNumber" type="text" value={this.state.phoneNumber}/>
							</div>
						</div>
						<div className ="col-sm">
							<table className="table table-bordered">
								<thead>
									<tr>
										<th>Parameter/Variable Key</th>
										<th>Parameter/Variable Value</th>
									</tr>
								</thead>
								<tbody>
								{this.state.parameters.map(parametersMap => (
										<tr>
											<td>{parametersMap.key}</td>
											<td>{parametersMap.value}</td>
										</tr>
										
								))}														
								</tbody>
							</table>
							<br/>
							<table className="table table-bordered">
								<thead>
									<tr>
										<th>Tag</th>
										<th>Tag value</th>
									</tr>
								</thead>
								<tbody>
								{this.state.tags.map(tagsMap => (
										<tr>
											<td>Tag</td>
											<td>{tagsMap.tag}</td>
										</tr>
										
								))}														
								</tbody>
							</table>
							<br/>
							<div className="container">
								<div className="row">
									<div className="col-sm justify-content-start">
										<button className="btn icon btn-primary" value="submit" onClick={this.clearVariables} name="clearVariables" type="submit">Clear variables</button>
									</div>
									<div className="col-sm justify-content-center">
										<button className="btn icon btn-primary" value="submit" onClick={this.sendSms} name="sendSms" type="submit">Send SMS</button>
									</div>
									<div className="col-sm justify-content-end">
										<button className="btn icon btn-primary" value="submit" onClick={this.doPreview} name="Preview" type="submit">Preview</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm">
							<Preview show={this.state.show} body={this.state.body} smsUrl={this.state.smsUrl} />
							<SmsSent smsSent={this.state.smsSent} />
						</div>
					</div>
				</div>
		);
	}
}

export default function(elementId, sendSms) {
	ReactDOM.render(<ChannelTesterReact sendSms={sendSms}  instanceId={elementId} />, document.getElementById(elementId));
}