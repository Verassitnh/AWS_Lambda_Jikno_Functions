'use strict';

const AWS = require('aws-sdk');

exports.handler = async (e, context) => {
	const documentClient = new AWS.DynamoDB.DocumentClient();

	let resBody = "";
	let statCode = 0;

	const params = {
		TableName: "About"
	};


	try {
		const data = await documentClient.scan(params).promise();
		resBody = JSON.stringify(data.Items);
		statCode = 200;

	} catch (err) {
		resBody = `Unable to Get Versions: ${err} `;
		statCode = 500;
	}

	const res = {
		statusCode: statCode,
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.parse(resBody),
	};
	return res;
};
