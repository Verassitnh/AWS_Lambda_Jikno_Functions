'use strict'

const AWS = require('aws-sdk')

exports.handler = async (e, context) => {
	const documentClient = new AWS.DynamoDB.DocumentClient();

	let resBody = "";
	let statCode = 0;

	const params = {
		TableName: "Users"
	}


	try {
		const data = await documentClient.scan(params).promise();
		resBody = JSON.stringify(data.Items);
		statCode = 200;

	} catch (err) {
		resBody = `Unable to Get Users: ${err} `
		statCode = 500;
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