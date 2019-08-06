const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//set static path > for UI
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());
/**
|--------------------------------------------------
| Public Key: BAz4U03plwj8vf9FGcKxZ7dizd-OUIW0cEJKjEbl5hxogr7kL1bI7b0MeO_gmzt7EmKsT76mRRbKu3D3QVQ-mEU
| Private Key: WMaXb4w7BcCGyQvyip2QVYi1cQhHBcRwxjZ6dgBkEhU
|--------------------------------------------------
*/


const publicVapidKey = 'BAz4U03plwj8vf9FGcKxZ7dizd-OUIW0cEJKjEbl5hxogr7kL1bI7b0MeO_gmzt7EmKsT76mRRbKu3D3QVQ-mEU';
const privateVapidKey = 'WMaXb4w7BcCGyQvyip2QVYi1cQhHBcRwxjZ6dgBkEhU';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);


//sibscribe route
app.post('/subscribe', (req, res) => {
    //get subscription objecet
    const subsscription = req.body;
    
    //send 201 - resource created
    res.status(201).json({});

    //create payload
    const payload = JSON.stringify({title: 'Push Test'});

    //pass object into the send notification
    webpush.sendNotification(subsscription, payload).catch(err => console.error(err));

    

});

const PORT = 5000;
app.listen(PORT, () => console.log(`server started at ${PORT}`));

