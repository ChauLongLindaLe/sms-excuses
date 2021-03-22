const port = process.env.PORT || 4000;
const twilioKey = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
const twilioSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
const twilioNumber = process.env.REACT_APP_TWILIO_PHONE_NUMBER;

module.exports = {
    port,
    twilioKey,
    twilioSid,
    twilioNumber,
};