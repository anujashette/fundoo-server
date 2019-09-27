/******************************************************************************
 *  Purpose:  Service is created to send data to note.model to perform CRUD 
 *            operations and write business logic.
 *
 *  @file    note.service
 *  @author  Anuja Shette
 *  @version 1.0
 *  @since   06-08-2019
 *
 ******************************************************************************/
const noteModelObj = require('../model/note.model')
const getData = require('../middleware/getRedisData')
function NoteService() { }

/****************************************************************************************************
 * @param addField
 * @description pass note data to model after callback service receives added data or error and send
 * back to addNoteController
 ****************************************************************************************************
 */
NoteService.prototype.addNoteServ = (addField) => {
    console.log('Note Service ===>', addField)

    let CreatResponse = {}
    let createdNote = noteModelObj.create(addField.note, addField.userId)

    if (createdNote.error) {
        CreatResponse.status = false
        CreatResponse.error = createdNote.error
        return CreatResponse
    }

    CreatResponse.status = true
    CreatResponse.message = 'Note created successfully'
    CreatResponse.data = createdNote

    return CreatResponse
}

/****************************************************************************************************
 * @param param
 * @description pass note id, user id, query, size to model after callback service receives updated 
 *  data or error and send back to readNoteController
 ****************************************************************************************************
 */
NoteService.prototype.readNoteServ = async (param) => {
    console.log('Read Note Service ===>', param)

    let readResponse = {}
    let readParam = {}
    readParam.query = { $and: [{ "userId": param.userId }, { 'trash': false, 'archive': false }] }
    // await getData.getCacheData('readAllBy' + JSON.stringify(param.field))
    //     .then((reply) => {  , {}, param.query
    //         console.log('reply--->', reply);
    //         readResponse.data = JSON.parse(reply)
    //     })
    //     .catch((err) => {
    //         console.log('reply error--->', err);
    //     })

    // if (!readResponse.data) {
    let getNote = await noteModelObj.read(readParam)
    console.log('data read ===>', getNote)

    if (getNote.error) {
        readResponse.status = false
        readResponse.error = getNote.error
        return readResponse
    }
    readResponse.data = getNote.readData
    readResponse.totalpages = getNote.totalPages
    // }
    readResponse.status = true
    readResponse.message = 'Note read successfully'

    return readResponse
}

/****************************************************************************************************
 * @param updateTitle
 * @description pass note title and id to model after callback service receives updated data or error 
 * and send back to updateTitleController
 ****************************************************************************************************
 */
NoteService.prototype.updateTitleServ = (updateTitle) => {
    console.log('Update Title Service ===>', updateTitle)

    let field = { title: updateTitle.title }
    let updateTitleRes = {}
    let updatedTitle = noteModelObj.update(field, updateTitle.noteId)

    if (updatedTitle.error) {
        updateTitleRes.status = false
        updateTitleRes.error = updatedTitle.error
        return updateTitleRes
    }
    console.log('data ===>', updatedTitle)
    updateTitleRes.status = true
    updateTitleRes.message = 'Note title updated successfully'
    updateTitleRes.data = updatedTitle

    return updateTitleRes
}

/****************************************************************************************************
 * @param updateDesc
 * @description pass note description and id to model after callback service receives updated data or error 
 * and send back to updateDescController
 ****************************************************************************************************
 */
NoteService.prototype.updateDescServ = (updateDesc) => {
    console.log('Update description Service ===>', updateDesc)

    let field = { description: updateDesc.description }
    let updateDescRes = {}
    let updatedDesc = noteModelObj.update(field, updateDesc.noteId)

    if (updatedDesc.error) {
        updateDescRes.status = false
        updateDescRes.error = updatedDesc.error
        return updateDescRes
    }
    console.log('data ===>', updatedDesc)
    updateDescRes.status = true
    updateDescRes.message = 'Note description updated successfully'
    updateDescRes.data = updatedDesc

    return updateDescRes
}

/****************************************************************************************************
 * @param updateColor
 * @description pass note color and id to model after callback service receives updated data or error 
 * and send back to updateColorController
 ****************************************************************************************************
 */
NoteService.prototype.updateColorServ = (updateColor) => {
    console.log('Update color Service ===>', updateColor)

    let field = { notecolor: updateColor.notecolor }
    let updateColorRes = {}
    let updatedColor = noteModelObj.update(field, updateColor.noteId)

    if (updatedColor.error) {
        updateColorRes.status = false
        updateColorRes.error = updatedColor.error
        return updateColorRes
    }
    console.log('data ===>', updatedColor)
    updateColorRes.status = true
    updateColorRes.message = 'Note color updated successfully'
    updateColorRes.data = updatedColor

    return updateColorRes
}

/****************************************************************************************************
 * @param updateRemind
 * @description pass note reminder and id to model after callback service receives updated data or error 
 * and send back to updateRemindController
 ****************************************************************************************************
 */
NoteService.prototype.updateRemindServ = (updateRemind) => {
    console.log('Update remind Service ===>', updateRemind)

    let field = { reminder: [updateRemind.reminder] }
    let updateRemindRes = {}
    let updatedRemind = noteModelObj.update(field, updateRemind.noteId)

    if (updatedRemind.error) {
        updateRemindRes.status = false
        updateRemindRes.error = updatedRemind.error
        return updateRemindRes
    }
    console.log('data ===>', updatedRemind)
    updateRemindRes.status = true
    updateRemindRes.message = 'Note reminder updated successfully'
    updateRemindRes.data = updatedRemind

    return updateRemindRes
}

/****************************************************************************************************
 * @param deleteRemind
 * @description pass id to model after callback service receives updated data or error and send back 
 * to deleteRemindController
 ****************************************************************************************************
 */
NoteService.prototype.deleteRemindServ = (deleteRemind) => {
    console.log('Delete remind Service ===>', deleteRemind)

    let field = { reminder: [] }
    let deleteRemindRes = {}
    let deletedRemind = noteModelObj.update(field, deleteRemind.noteId)

    if (deletedRemind.error) {
        deleteRemindRes.status = false
        deleteRemindRes.error = deletedRemind.error
        return deleteRemindRes
    }
    console.log('data ===>', deletedRemind)
    deleteRemindRes.status = true
    deleteRemindRes.message = 'Note reminder deleted successfully'
    deleteRemindRes.data = deletedRemind

    return deleteRemindRes
}

/****************************************************************************************************
 * @param updateArchive
 * @description pass note archive status and id to model after callback service receives updated data 
 * or error and send back to updateArchiveController
 ****************************************************************************************************
 */
NoteService.prototype.updateArchiveServ = async (updateArchive) => {
    console.log('Update Archive Service ===>', updateArchive)
    let param = {}
    param.query = { '_id': updateArchive.noteId }
    let updateArchiveRes = {}
    let updatedArchive = ''
    let status = await noteModelObj.read(param)

    if (!status.error && status.readData[0].trash == false) {
        let field = { archive: !status.readData[0].archive }
        updatedArchive = await noteModelObj.update(field, updateArchive.noteId)
    }
    else if (status.readData[0].trash == true) {
        updateArchiveRes.status = false
        updateArchiveRes.error = 'already in trash'
        return updateArchiveRes
    }
    else if (updatedArchive.error || status.error) {
        updateArchiveRes.status = false
        updateArchiveRes.error = updatedArchive.error || status.error
        return updateArchiveRes
    }
    console.log('data ===>', updatedArchive)
    updateArchiveRes.status = true
    updateArchiveRes.message = 'Note archive updated successfully'
    updateArchiveRes.data = updatedArchive

    return updateArchiveRes
}

/****************************************************************************************************
 * @param updateTrash
 * @description pass note trash status and id to model after callback service receives updated data 
 * or error and send back to updateTrashController
 ****************************************************************************************************
 */
NoteService.prototype.updateTrashServ = async (updateTrash) => {
    console.log('Update Trash Service ===>', updateTrash)
    let param = {}
    param.query = { '_id': updateTrash.noteId }
    let updateTrashRes = {}
    let updatedTrash = ''
    let status = await noteModelObj.read(param)

    if (!status.error) {
        let field = { trash: !status.readData[0].trash }
        updatedTrash = noteModelObj.update(field, updateTrash.noteId)
    }
    else if (status.readData[0].archive == true) {
        updateTrashRes.status = false
        updateTrashRes.error = 'already in archive'
        return updateTrashRes
    }
    else if (updatedTrash.error || status.error) {
        updateTrashRes.status = false
        updateTrashRes.error = updatedTrash.error || status.error
        return updateTrashRes
    }
    console.log('data ===>', updatedTrash)
    updateTrashRes.status = true
    updateTrashRes.message = 'Note trash updated successfully'
    updateTrashRes.data = updatedTrash

    return updateTrashRes
}

/****************************************************************************************************
 * @param deleteNote
 * @description pass note id to model after callback service receives deleted data or error 
 * and send back to deleteNoteController
 ****************************************************************************************************
 */
NoteService.prototype.deleteNoteServ = async (deleteNote) => {
    console.log('Delete Note Service ===>', deleteNote)
    let param = {}
    param.query = { '_id': deleteNote.noteId }
    let status = await noteModelObj.read(param)
    let deletedNote = ''
    let deleteResponde = {}
    if (!status.error && status.readData[0].trash == true)
        deletedNote = noteModelObj.delete(deleteNote.noteId)

    else if (status.readData[0].trash == false) {
        deleteResponde.status = false
        deleteResponde.error = 'Note is not in trash'
        return deleteResponde
    }
    else if (deletedNote.error || status.error) {
        deleteResponde.status = false
        deleteResponde.error = deletedNote.error
        return deleteResponde
    }
    console.log('data ===>', deletedNote)
    deleteResponde.status = true
    deleteResponde.message = 'Note deleted successfully'
    deleteResponde.data = deletedNote

    return deleteResponde
}

/****************************************************************************************************
 * @param readParam
 * @description pass user id, query, size to model after callback service receives updated 
 *  data or error and send back to readArchiveController
 ****************************************************************************************************
 */
NoteService.prototype.readArchiveServ = async (readParam) => {
    console.log('Read archive notes Service ===>', readParam.userId)

    let readArchiveRes = {}
    let param = {}
    param.query = { $and: [{ "userId": readParam.userId }, { 'archive': true, 'trash': false }] }, {}, readParam.query
    let getArchiveNotes = await noteModelObj.read(param)

    if (getArchiveNotes.error) {
        readArchiveRes.status = false
        readArchiveRes.error = getArchiveNotes.error
        return readArchiveRes
    }
    console.log('data read ===>', getArchiveNotes)
    readArchiveRes.status = true
    readArchiveRes.message = 'Note read successfully'
    readArchiveRes.data = getArchiveNotes.readData
    readArchiveRes.totalpages = getArchiveNotes.totalPages
    return readArchiveRes
}

/****************************************************************************************************
 * @param readParam
 * @description pass user id, query, size to model after callback service receives updated 
 *  data or error and send back to readTrashController
 ****************************************************************************************************
 */
NoteService.prototype.readTrashServ = async (readParam) => {
    console.log('Read trash notes Service ===>', readParam.userId)

    let readTrashRes = {}
    let param = {}
    param.query = { $and: [{ "userId": readParam.userId }, { 'trash': true }] }, {}, readParam.query

    // readParam = { 'trash': true }
    let getTrashNotes = await noteModelObj.read(param)

    if (getTrashNotes.error) {
        readTrashRes.status = false
        readTrashRes.error = getTrashNotes.error
        return readTrashRes
    }
    console.log('data read ===>', getTrashNotes)
    readTrashRes.status = true
    readTrashRes.message = 'Note read successfully'
    readTrashRes.data = getTrashNotes.readData
    readTrashRes.totalpages = getTrashNotes.totalPages
    return readTrashRes
}

/****************************************************************************************************
 * @param readParam
 * @description pass user id, query, size to model after callback service receives updated 
 *  data or error and send back to readReminderController
 ****************************************************************************************************
 */
NoteService.prototype.readRemindServ = async (readParam) => {
    console.log('Read reminder notes Service ===>', readParam.userId)

    let readRemindRes = {}
    let param = {}
    param.query = { $and: [{ "userId": readParam.userId }, { "reminder": { $ne: [] } }] }, {}, readParam.query

    let getRemindNotes = await noteModelObj.read(param)

    if (getRemindNotes.error) {
        readRemindRes.status = false
        readRemindRes.error = getRemindNotes.error
        return readRemindRes
    }
    console.log('data read ===>', getRemindNotes)
    readRemindRes.status = true
    readRemindRes.message = 'Reminder Note read successfully'
    readRemindRes.data = getRemindNotes.readData
    readRemindRes.totalpages = getRemindNotes.totalPages
    return readRemindRes
}


/****************************************************************************************************
 * @param updateLabel
 * @description pass labelId and noteId to model after callback service receives updated data or error 
 * and send back to addLabelToNoteController
 ****************************************************************************************************
 */
NoteService.prototype.updateLabelServ = (updateLabel) => {
    console.log('Update label Service ===>', updateLabel)

    let field = { $addToSet: { notelabel: updateLabel.labelId } }
    let updateLabelRes = {}
    let updatedLabel = noteModelObj.update(field, updateLabel.noteId)

    if (updatedLabel.error) {
        updateLabelRes.status = false
        updateLabelRes.error = updatedLabel.error
        return updateLabelRes
    }
    console.log('data ===>', updatedLabel)
    updateLabelRes.status = true
    updateLabelRes.message = 'Note label updated successfully'
    updateLabelRes.data = updatedLabel

    return updateLabelRes
}

/****************************************************************************************************
 * @param deleteLabel
 * @description pass labelId and noteId to model after callback service receives updated data or error 
 * and send back to deleteLabelNoteController
 ****************************************************************************************************
 */
NoteService.prototype.deleteLabelServ = (deleteLabel) => {
    console.log('Delete label Service ===>', deleteLabel)

    let field = { $pull: { notelabel: deleteLabel.labelId } }
    let deleteLabelRes = {}
    let deletedLabel = noteModelObj.update(field, deleteLabel.noteId)

    if (deletedLabel.error) {
        deleteLabelRes.status = false
        deleteLabelRes.error = deletedLabel.error
        return deleteLabelRes
    }
    console.log('data ===>', deletedLabel)
    deleteLabelRes.status = true
    deleteLabelRes.message = 'Note label deleted successfully'
    deleteLabelRes.data = deletedLabel

    return deleteLabelRes
}

NoteService.prototype.latestNotes = async (param) => {
    console.log('Note count Service ===>', param)

    let response = {}
    let latestParam = {}
    latestParam.query = {$and:[{'userId':param.userId},{ 'trash': false, 'archive': false }] }
    latestParam.latest = true
    let latestNotes = await noteModelObj.read(latestParam)

    if (latestNotes.error) {
        response.status = false
        response.error = latestNotes.error
        return response
    }

    response.status = true
    response.message = 'latest notes retrived'
    response.data = latestNotes

    return response
}

NoteService.prototype.searchNotes = async (searchParam) => {
    let searchResponse = {}
    let param = {}
    param.query = {
        $and: [{ "userId": searchParam.userId },
        {
            $or:
                [
                    { 'title': { $regex: searchParam.searchKey, $options: 'i' } },
                    { 'description': { $regex: searchParam.searchKey, $options: 'i' } },
                    { 'notecolor': { $regex: searchParam.searchKey, $options: 'i' } },
                    { 'reminder': { $regex: searchParam.searchKey, $options: 'i' } },
                ]
        },
        { 'trash': false }
        ]
    }

    let searchNotes = await noteModelObj.read(param)
    if (searchNotes.error) {
        searchResponse.status = false
        searchResponse.error = searchNotes.error
        return searchResponse
    }
    searchResponse.data = searchNotes.readData
    searchResponse.totalpages = searchNotes.totalPages
    searchResponse.status = true
    searchResponse.message = 'Note search successfully'

    return searchResponse
}
/****************************************************************************************************
 * @description NoteService object created and exports to controller
 ****************************************************************************************************
 */
let noteServObj = new NoteService()
module.exports = noteServObj