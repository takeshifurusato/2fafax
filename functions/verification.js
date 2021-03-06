exports.handler = function (context, event, callback) {
    const response = new Twilio.Response();
    response.appendHeader('Content-Type', 'application/json');

    if (!event.fax_number.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/)) {
        response.setStatusCode(200);
        response.setBody({
            "result": false,
            "message": "invalid Parameter."
        });
        return callback(null, response);
    }

    const email = require('util').format("%s+%s@%s", context.MAIL_ACCOUNT, event.fax_number, context.MAIL_DOMAIN);

    const client = context.getTwilioClient();
    const service = context.VERIFY_SERVICE_SID;

    client.verify.services(service)
        .verifications
        .create({
            to: email,
            channel: 'email',
        })
        .then(verification => {
            response.setStatusCode(200);
            response.setBody({
                "result": true
            });
            callback(null, response);
        })
        .catch(error => {
            response.setStatusCode(error.status);
            response.setBody({
                "result": false,
                "message": error.message
            });
            callback(null, response);
        });
};
