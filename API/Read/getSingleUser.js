'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
	const documentClient = new AWS.DynamoDB.DocumentClient();

	const { id } = event.pathParameters;

	let resBody = "";
	let statCode = 0;

	const params = {
		TableName: "Users",
		Key: {
			id,
		}
	};


	try {
		const data = await documentClient.get(params).promise();
		resBody = JSON.stringify(data);
		statCode = 200;

	} catch (err) {
		resBody = `Unable to GET User: ${err} `;
		statCode = 500;
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
