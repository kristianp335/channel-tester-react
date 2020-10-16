package com.liferay.kris.channel.tester.portlet;


import com.liferay.kris.channel.tester.constants.ChannelTesterPortletKeys;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCResourceCommand;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import javax.portlet.PortletException;
import javax.portlet.ResourceRequest;
import javax.portlet.ResourceResponse;

import org.osgi.service.component.annotations.Component;

@Component(
	    immediate = true,
	    property = {
	    	"javax.portlet.name=" + ChannelTesterPortletKeys.ChannelTester,
	        "mvc.command.name=/sendSms"
	    },
	    service = MVCResourceCommand.class
)

public class ResourceMvcCommandSendSms implements MVCResourceCommand {

	@Override
	public boolean serveResource(ResourceRequest resourceRequest, ResourceResponse resourceResponse)
			throws PortletException {
		
		String to = resourceRequest.getParameter("to");
		System.out.println("number is " + to);
				
	    String smsUrl = resourceRequest.getParameter("smsUrl");
	    System.out.println("smsUrl is " + smsUrl);
		
		String body = resourceRequest.getParameter("body");
		System.out.println("body is " + body);
		
		//hard coded needs config
	    String from = "+19704369264";
		
		
		//you need to get these values from your Twillio Account
		final String ACCOUNT_SID = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
		final String AUTH_TOKEN = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
		Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
		Message message = Message.creator(new PhoneNumber(to),
		  new PhoneNumber(from), 
		  body + " " + smsUrl).create();

		System.out.println(message.getSid());
		
		return false;
	}

}
