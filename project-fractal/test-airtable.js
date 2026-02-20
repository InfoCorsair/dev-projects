// Include the airtable_record from airtable.js
const {airtable_record} = require('./airtable');

// Run the function to test Airtable integration
airtable_record()
	.then((newRecords) => {
		console.log('Airtable record processing completed successfully!');
		console.log('New records:', newRecords);
	})
	.catch((err) => console.error('Error with airtable record processing:', err));
