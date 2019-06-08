'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
	const documentClient = new AWS.DynamoDB.DocumentClient();

	let resBody = "";
	let statCode = 0;


	const { version  } = event.pathParameters;

	const params = {
		TableName: "About",
		Key: {
			version,
		}
	};


	try {
		const data = await documentClient.delete(params).promise();
		resBody = JSON.stringify(data);
		statCode = 204;

	} catch (err) {
		resBody = `Unable to Delete Version: ${err} `;
		statCode = 403;
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
