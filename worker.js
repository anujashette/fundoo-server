const noteModelObj = require('./app/model/note.model')
const gcm = require("node-gcm")

async function notify () {
            try {
                // let res = await note.find({}).populate('userId')

                let res = await noteModelObj.read({userId:''})
                console.log(' parseDate== "current time== parseDate==',res);

                for (let i = 0; i < res.length; i++) {
                    if (res[i].userId.notificationlink && res[i].reminder.length > 0) {
                        let currentDate = new Date()
                        currentDate = Date.parse(currentDate)
                        let reminder = res[i].reminder[0]
                        let parseDate = Date.parse(reminder)
                        // console.log(process.env.firebaseApiKey)
                        console.log(' parseDate==', parseDate - 1000, "current time==", currentDate, ' parseDate==', parseDate + 1000);
    
                        if (currentDate > parseDate - 1000 && currentDate < parseDate + 1000) {
    
                            var message = new gcm.Message({
                                data: { key1: 'hello' },
                                notification: {
                                    title: 'Fundoo reminder',
                                    body: res[i].title
                                }
                            });
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

                            let mailContents = {
                                subject:'Fundoo Notification...!',
                                html:`Reminder for :'${res[i].title}</a>"`
                            }
                            mailObj.mailer( data.email,mailContents)
                        }
                    }
                }
            }
            catch (error) {
                console.log('error', error);
            }
        }

module.exports = notify