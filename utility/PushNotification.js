const gcm = require("node-gcm")
require('dotenv').config()

var message = new gcm.Message({
    data: { key1: 'hello' },
    notification: {
        title: 'SPECOZ Offers1',
        body: 'body_data'
    }
});
function pushNotification(note) {

    setInterval(
        async function () {
            try {
                let res = await note.find({}).populate('userId')
                for (let i = 0; i < res.length; i++) {
                    if (res[i].userId.notificationlink && res[i].reminder.length > 0) {
                        let currentDate = new Date()
                        currentDate = Date.parse(currentDate)
                        let reminder = res[i].reminder[0]
                        let parseDate = Date.parse(reminder)
                        console.log(res[i].userId.notificationlink)

                        // if (currentDate > parseDate-1000 && currentDate < parseDate+1000) {
                            console.log('final condition', res[i].userId.notificationlink)
                            let sender = gcm.Sender(process.env.firebaseApiKey)
                            sender.send(message, res[i].userId.notificationlink, function (err, response) {
                               
                                if (err) {
                                    console.log("error in firebase", err);
                                }
                                else {
                                    console.log("respose from firebase", response);
                                }
                            })
                        // }
                    }
                }
            }
            catch (error) {
                console.log('error', error);
            }
        }
        , 5000);
}
module.exports = pushNotification