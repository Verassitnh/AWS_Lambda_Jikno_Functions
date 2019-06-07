'use strict'

const AWS = require('aws-sdk')

exports.handler = async (e, context) => {
	const documentClient = new AWS.DynamoDB.DocumentClient();

	let resBody = "";
	let statCode = 0;

	const params = {
		TableName: "Users",
		Key: {
			id: 'resBody.username',
		},
		UpdateExpression: " set username = :n",
		ExpressionAttributeValues: {
			":n": "jackson528"
		},
		ReturnValues: "UPDATED_NEW"
	}


	try {
		const data = await documentClient.update(params).promise();
		resBody = JSON.stringify(data);
		statCode = 200;

	} catch (err) {
		resBody = `Unable to Update User: ${err} `
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
