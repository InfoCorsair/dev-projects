//reads .env file and defines it's use for the request
require('dotenv').config();
//import axios
const axios = require('axios');
//import fs module
const fs = require('fs');

function processRecordIDs(response){
	try {
	//initialize empty array to hold airtable records
	let existingRecords = [];
	if(fs.existsSync('recordIDs.json')){
		const file = fs.readFileSync('recordIDs.json', 'utf-8');
		if(file){
			existingRecords = JSON.parse(file);
		} else{
			existingRecords = [];
		}
	}
	//Get new records from airtable response
	const newRecords = response.data.records;
	const currentIDs = existingRecords;

	//Filter out new records from records that already exist
	const uniqueNewRecords = newRecords.filter(function(record) {
		return !currentIDs.includes(record.id);
	});

	//Extract the ids just from the unique ids
	const newIDs = uniqueNewRecords.map(function(record){
		return record.id;
	});

	//Combine with existing records
	const allRecords = [...currentIDs, ...newIDs];

	//Write back to recordIDs.json
	fs.writeFileSync('recordIDs.json', JSON.stringify(allRecords, null, 2));

	return allRecords;
	}
	catch (error) {
		console.error('Error processing record IDs:', error);
		throw error;
	}
};

//Airtable GET request using axios
async function airtable_record(){
        //API Endpoint
        const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_API_BASE_ID}/${encodeURIComponent(process.env.AIRTABLE_TABLE_NAME)}`;
        //wait until request is done
        const response = await axios.get(url, {
                headers: {
                        'Authorization': `Bearer ${process.env.AIRTABLE_API_TOKEN}`
                }
        });

	//Process records
	const newRecords = processRecordIDs(response);

        //records the response
        console.log(`Found ${newRecords.length} new records`);
	return newRecords;
};

module.exports = {airtable_record};

