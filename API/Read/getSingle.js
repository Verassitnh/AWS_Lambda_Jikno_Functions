'use strict'

const AWS = require('aws-sdk')

exports.handler = async (e, context) => {
	const documentClient = new AWS.DynamoDB.DocumentClient();

	let resBody = "";
	let statCode = 0;

	const params = {
		TableName: "Users",
		Key: {
			id: 'Gninoskcaj',
		}
	}


	try {
		const data = await documentClient.get(params).promise();
		resBody = JSON.stringify(data);
		statCode = 200;

	} catch (err) {
		resBody = `Unable to GET User: ${err} `
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