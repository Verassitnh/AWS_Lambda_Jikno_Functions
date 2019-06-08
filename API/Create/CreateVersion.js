'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
	const documentClient = new AWS.DynamoDB.DocumentClient();

	let resBody = "";
	let statCode = 0;
	
    const { version, discordIcon, discordInvite, frontend, backend, changeLog } = event;



	const params = {
		TableName: "About",
		Item: {
			 version,
			 discordIcon,
			 discordInvite,
			 frontend,
			 backend,
			 changeLog,
		}
	};
	try {
		const data = await documentClient.put(params).promise();
		resBody = JSON.stringify(event );
		statCode = 201;

	} catch (err) {
		resBody = `Unable to Create Version: ${err} `;
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
