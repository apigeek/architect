var lambda = require("./lambda");

var event = {
    "Records": [
        {
            "EventVersion": "1.0",
            "EventSubscriptionArn": "arn:aws:sns:EXAMPLE",
            "EventSource": "aws:sns",
            "Sns": {
                "SignatureVersion": "1",
                "Timestamp": "1970-01-01T00:00:00.000Z",
                "Signature": "EXAMPLE",
                "SigningCertUrl": "EXAMPLE",
                "MessageId": "95df01b4-ee98-5cb9-9903-4c221d41eb5e",
                "Message": "{\"org\":\"telstra-apipractice\",\"resource\":\"developers\",\"basepath\":\"/v1/sathish/mataap/audits/organizations\",\"env\":\"kfc\"}",
                "Test": {
                    "Type": "String",
                    "Value": "TestString"
                },
                "TestBinary": {
                    "Type": "Binary",
                    "Value": "TestBinary"
                }
            },
            "Type": "Notification",
            "UnsubscribeUrl": "EXAMPLE",
            "TopicArn": "arn:aws:sns:EXAMPLE",
            "Subject": "TestInvoke"
        }

    ]
};

lambda.handler( event, {}, function(err,result) {
    console.log("All Done: %j", result);
});