'use strict'

const AWS = require('aws-sdk')

exports.handler = async (e, context) => {
	const documentClient = new AWS.DynamoDB.DocumentClient();

	let resBody = "";
	let statCode = 0;


	const { id  } = event.pathParameters;

	const params = {
		TableName: "Users",
		Key: {
			id: id,
		}
	}


	try {
		const data = await documentClient.delete(params).promise();
		resBody = JSON.stringify(data);
		statCode = 204;

	} catch (err) {
		resBody = `Unable to Delete User: ${err} `
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
