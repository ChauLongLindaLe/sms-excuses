require('dotenv').config();
const {port,twilioSid,twilioKey,twilioNumber,} = require('./config/environment.js');
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const client = require('twilio')(twilioSid, twilioKey);

const app = express(); 
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("This is from express.js");
});

app.post("/api/messages", (req, res) => {
    res.header('Content-Type', 'application/json');
    client.messages
        .create({
            from: twilioNumber,
            to: req.body.recipientNumber,
            body: req.body.message,
            // statusCallback: 'https://hookb.in/xY6xRmBPOqT7zzYJedOm',
            statusCallback: 'http://127.0.0.1:4000/status',
        })
        .then(message => {
            console.log(message.sid)
            res.send(JSON.stringify({
                success: true,
                status: message.status
            }));
        })
        .catch(err => {
            console.log(err);
            res.send(JSON.stringify({
                success: false
            }));
        });
});


app.listen(port, () => console.log(`🚀 Listening for action on port ${port}`));
