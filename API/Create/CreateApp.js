'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
	const documentClient = new AWS.DynamoDB.DocumentClient();

	let resBody = "";
	let statCode = 0;
console.log('EVENT = '+ JSON.stringify(event));
    const {appName, description, numberOfUsers} = event;



	const params = {
		TableName: "Library",
		Item: {
			 appName,
			 appID: new Date().getTime(),
			 description,
			 users: numberOfUsers
		}
	};
	try {
		const data = await documentClient.put(params).promise();
		resBody = JSON.stringify(event );
		statCode = 201;

	} catch (err) {
		resBody = `Unable to Create App: ${err} `;
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
