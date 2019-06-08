'use strict';

// WARNING: THIS FUNCTION NEEDS PARAMS

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
	const documentClient = new AWS.DynamoDB.DocumentClient();

	let resBody = "";
	let statCode = 0;
    // const { Put Something in here } = event;



// 	const params = {
// 		TableName: "Apps",
// 		Item: {
//             do,
//             something,
//             fun,
//             and,
//             happy
// 		}
// 	};
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
