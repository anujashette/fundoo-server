/******************************************************************************
 *  Purpose:  Model performs CRUD operations with database
 *
 *  @file    note.model
 *  @author  Anuja Shette
 *  @version 1.0
 *  @since   06-08-2019
 *
 ******************************************************************************/
const mongoose = require('mongoose')
const log = require('../logfile/logger')
const gcm = require("node-gcm")
require('dotenv').config()
const redisObj = require('../../utility/RedisOperations')
/**
 * Note Schema is created to store data in database
 */

const noteSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, 'User Id required'],
        ref: 'user'
    },
    title: {
        type: String,
        require: [true, 'title required']
    },
    description: {
        type: String,
        require: [true, 'description required']
    },
    reminder: [
        String
    ],
    notecolor: {
        type: String
    },
    archive: {
        type: Boolean,
        default: false
    },
    trash: {
        type: Boolean,
        default: false
    },
    notelabel: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'labels'
    }]
},
    {
        timestamps: true
    }
);
/**
  * Note Schema object
  */
const note = mongoose.model('notes', noteSchema)

function Note() { }

/****************************************************************************************************
 * @param addField
 * @param userId
 * @description Create note in database using userId 
 ****************************************************************************************************
 */
Note.prototype.create = async (addField, userId) => {
    try {
        console.log('Create Note Model ===>', addField)

        let addNote = new note({
            userId: userId,
            title: addField.title,
            description: addField.description,
            reminder: addField.reminder,
            notecolor: addField.notecolor,
            archive: addField.archive,
            notelabel: addField.notelabel
        })

        let saveNote = await addNote.save()
        // await client.set('note' + note.id, JSON.stringify(note), redis.print)
        console.log('des in model====>', saveNote);

        return saveNote
    }
    catch (err) {
        log.logger.error('Create Note error==>', err)
        let error = { error: 'Note already created' }
        return error
    }
}

/*****************************************************************************************************
 * @param param
 * @description Read note from database using noteId/search by title,description,color,reminder/userID
 ***************************************************************************************************** 
 */
Note.prototype.read = async (param) => {
    try {
        let readData = []
        console.log("param in read note", param);
        if (param.latest) {
            readData = await note.find(param.query).sort({ 'updatedAt': -1 }).limit(10).populate('notelabel')
        }
        else {
            readData = await note.find(param.query).sort({ '_id': -1 }).populate('notelabel')
        }

        if (readData != '') {
            let data = { readData: readData }
            console.log("ALL NOTES==================>", data);
            return data
        }
        else {
            let error = { error: 'Notes are not found to read' }
            return error
        }

    }
    catch (err) {
        log.logger.error('Read Note error==>', err)
        let error = { error: 'Note Id is not found to read' }
        return error
    }
}

/*****************************************************************************************************
 * @param updateField
 * @param noteId
 * @description Update note in database using noteId
 *****************************************************************************************************
 */
Note.prototype.update = async (updateField, noteId) => {
    try {
        console.log('Update note Model ===>', updateField, noteId)
        // client.flushdb(function (err, succeeded) {
        //     console.log(succeeded); // will be true if successfull
        // });

        let updateData = await note.findOneAndUpdate({ '_id': noteId }, updateField)
        await client.set('updateAllBy' + JSON.stringify(updateField), JSON.stringify(updateData), redis.print)

        if (!updateData) {
            let error = { error: 'Note is not updated' }
            return error
        }
        else {
            return updateData
        }
    }
    catch (err) {
        log.logger.error('Update Note error==>', err)
        let error = { error: 'Note Id is not found to update' }
        return error
    }
}

/*****************************************************************************************************
 * @param noteId
 * @description Delete note in database using noteId
 *****************************************************************************************************
 */
Note.prototype.delete = async (noteId) => {
    try {
        console.log('Delete note Model ===>', noteId)
        let deletedData = note.findByIdAndRemove(
            { '_id': noteId }
        )
        console.log('Deleted data===>', deletedData)
        if (deletedData != '') {
            return deletedData
        }
        else {
            let error = { error: 'Note is not deleted' }
            return error
        }
    }
    catch (err) {
        log.logger.error('Delete Note error==>', err)
        let error = { error: 'Note Id is not found to delete' }
        return error
    }
}

// setInterval(
//     async function () {
//         try {
//             let res = await note.find({}).populate('userId')
//             for (let i = 0; i < res.length; i++) {
//                 if (res[i].userId.notificationlink && res[i].reminder.length > 0) {
//                     let currentDate = new Date()
//                     currentDate = Date.parse(currentDate)
//                     let reminder = res[i].reminder[0]
//                     let parseDate = Date.parse(reminder)
//                     // console.log(process.env.firebaseApiKey)
//                     console.log(' parseDate==', parseDate - 1000, "current time==", currentDate, ' parseDate==', parseDate + 1000);

//                     if (currentDate > parseDate - 1000 && currentDate < parseDate + 1000) {

//                         var message = new gcm.Message({
//                             data: { key1: 'hello' },
//                             notification: {
//                                 title: 'Fundoo reminder',
//                                 body: res[i].title
//                             }
//                         });
//                         console.log('final condition', res[i].userId.notificationlink)
//                         let sender = gcm.Sender(process.env.firebaseApiKey)
//                         sender.send(message, res[i].userId.notificationlink, function (err, response) {
//                             if (err) {
//                                 console.log("error in firebase", err);
//                             }
//                             else {
//                                 console.log("respose from firebase", response);
//                             }
//                         })
//                     }
//                 }
//             }
//         }
//         catch (error) {
//             console.log('error', error);
//         }
//     }
//     , 3000);

const noteModelObj = new Note()
module.exports = noteModelObj