'use strict'

const AWS = require('aws-sdk')

exports.handler = async (e, context) => {
	const documentClient = new AWS.DynamoDB.DocumentClient();

	let resBody = "";
	let statCode = 0;

	const params = {
		TableName: "Users",
		Item: {
			// username: resBody.username,
			// Id: resBody.id,
			// Email: resBody.email,
			// FirstName: resBody.firstName,
			// LastName: resBody.lastName,
			id: 'resBody.username',
			username: 'resBody.id',
			Email: 'resBody.email',
			FirstName: 'resBody.firstName',
			LastName: 'resBody.lastName',
		}
	}


	try {
		const data = await documentClient.put(params).promise();
		resBody = JSON.stringify(data);
		statCode = 201;

	} catch (err) {
		resBody = `Unable to Create User: ${err} `
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