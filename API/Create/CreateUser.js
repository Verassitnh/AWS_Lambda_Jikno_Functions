'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
	const documentClient = new AWS.DynamoDB.DocumentClient();
	let resBody = "";
	let statCode = 0;

	const { 
			username, 
			email,
			password,
			avatar,
			appsOrder,
			dashboardOrder,
			miniAppsOrder,
			plus,
			plusToken,
			firstName,
			lastName,
			storage, 
			notifications
		
	} = event;

	const params = {
		TableName: "Users",
		Item: {
				id: username.toUpperCase() + '_' + new Date().getTime(),
				username,
				email,
				password,
				avatar,
				appsOrder,
				dashboardOrder,
				miniAppsOrder,
				plus,
				plusToken,
				firstName,
				lastName,
				storage,
				notifications
			}
	};
	try {
		resBody = JSON.stringify(event);
		statCode = 200;

	} catch (err) {
		resBody = `Unable to Create User: ${err} `;
		statCode = 503;
	}

	const res = {
		statusCode: statCode,
		headers: {
			"Content-Type": "application/json",
			"access-control-allow-origin": "*"
		},
		body: resBody,
	};
	return res;
};
