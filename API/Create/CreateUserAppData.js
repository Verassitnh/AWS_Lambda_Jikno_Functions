'use strict';

const AWS = require('aws-sdk');

exports.handler = async(event, context) => {
	const documentClient = new AWS.DynamoDB.DocumentClient();

	let resBody = "";
	let statCode = 0;


	const params = {
		TableName: "Apps",
		Item: event
	};
	try {
		const data = await documentClient.put(params).promise();
		resBody = JSON.stringify(event);
		statCode = 201;

	}
	catch (err) {
		resBody = `Unable to Create AppData: ${err} `;
		statCode = 403;
	}

	const res = {
		statCode,
		headers: {
			"Content-Type": "application/json"
		},
		body: resBody,
	};
	return res;
};
