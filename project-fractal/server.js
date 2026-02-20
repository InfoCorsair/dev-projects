//import express
const express = require('express');
//create an application
const app = express();
//Set the port number in which the app will be broadcasted to
const port = 3000;

//required to setup a webhook
app.use(express.json());

//GET Request to retrieve "Hello World"
app.get('/', (req, res)=> {
	res.send('Hello World!');
});

//POST request to receive webhook data
app.post('/webhook', (req, res) => {
	console.log('Received webhook data:', req.body);
	res.status(200).send('Webhook Received');
});


app.listen(port, () => {
	console.log('Example app listening on port ${port}');
});
