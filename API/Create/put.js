'use strict'

const AWS = require('aws-sdk')

exports.handler = async (event, context) => {
	const documentClient = new AWS.DynamoDB.DocumentClient();

	let resBody = "";
	let statCode = 0;

	const {id, username, email, firstName, lastName} = JSON.parse(event.body)


	const params = {
		TableName: "Users",
		Item: {
			id: id,
			username: username,
			email: email,
			firstName: firstName,
			lastName: lastName
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