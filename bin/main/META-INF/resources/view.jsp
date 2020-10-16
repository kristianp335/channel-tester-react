<%@ include file="/init.jsp" %>

<portlet:resourceURL id="/sendSms" var="sendSms">
</portlet:resourceURL>

<div id="<portlet:namespace />"></div>

<aui:script require="<%= mainRequire %>">
	main.default('<portlet:namespace />', '${sendSms}');
</aui:script>