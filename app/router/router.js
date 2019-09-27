/******************************************************************************
 *  Purpose:  Forwarding request to appropriate controller.
 *
 *  @file    Router
 *  @author  Anuja Shette
 *  @version 1.0
 *  @since   06-08-2019
 *
 ******************************************************************************/
var express = require("express");
const userController = require('../controller/user.controller')
const noteController = require('../controller/note.controller')
const labelController = require('../controller/label.controller')
const upload = require('../middleware/multer')
const authObj = require('../middleware/authorization')

var appRouter = express.Router();



//  Default router
appRouter.get("/", function (req, res) {                                               
  res.status(200).send("Welcome to our restful fundoo API");
});

//  Registeration router
appRouter.post('/user/register', userController.register)   

//  Login router
appRouter.post('/user/login', userController.login)                             

//  Email authentication router
appRouter.get('/user/authorization/:token',authObj.isAuthorized,userController.emailVerification)    

//  Forget Password router
appRouter.post('/user/forgetpass', userController.forgetPass)            

//  Reset Password router
appRouter.put('/user/resetpass', authObj.isAuthorized, userController.resetPass)

//  Upload image and store in database
appRouter.put('/api/file/upload', upload.single("photos"), authObj.isAuthorized, userController.uploadFile) 

//  Notification router
appRouter.put('/user/notificationlink', authObj.isAuthorized, userController.notifyLink)

//  Create note router
appRouter.post('/note/addnote', authObj.isAuthorized, noteController.addNoteController)                

//  Read notes router
appRouter.post('/note/readnote', authObj.isAuthorized, noteController.readNoteController)          

//  Update title router
appRouter.put('/note/updatetitle', authObj.isAuthorized, noteController.updateTitleController)  

//  Update description router
appRouter.put('/note/updatedesc', authObj.isAuthorized, noteController.updateDescController) 

//  Update color router
appRouter.put('/note/updatecolor', authObj.isAuthorized, noteController.updateColorController) 

//  Update reminder router
appRouter.put('/note/updatereminder', authObj.isAuthorized, noteController.updateRemindController)

//  Update reminder router
appRouter.put('/note/deletereminder', authObj.isAuthorized, noteController.deleteRemindController)

//  Update archive router
appRouter.put('/note/updatearchive', authObj.isAuthorized, noteController.updateArchiveController)

//  Update trash router
appRouter.put('/note/updatetrash', authObj.isAuthorized, noteController.updateTrashController)

//  Delete note router
appRouter.post('/note/deletenote', authObj.isAuthorized, noteController.deleteNoteController)

//  Read archive notes router
appRouter.get('/note/readarchivenotes', authObj.isAuthorized, noteController.readArchiveController)   

//  Read trash notes router
appRouter.get('/note/readtrashnotes', authObj.isAuthorized, noteController.readTrashController)    

//  Read reminder notes router
appRouter.get('/note/readremindernotes', authObj.isAuthorized, noteController.readRemindController)

//  Update note label router
appRouter.put('/note/updatenotelabel', authObj.isAuthorized, noteController.addLabelNoteController)  

//  delete note label router
appRouter.put('/note/deletenotelabel', authObj.isAuthorized, noteController.deleteLabelNoteController)  

//  create label router
appRouter.post('/label/createlabel', authObj.isAuthorized, labelController.addLabelController) 

//  Read label router
appRouter.get('/label/readlabel', authObj.isAuthorized, labelController.readLabelController) 

//  Update label router
appRouter.put('/label/updatelabel', authObj.isAuthorized, labelController.updateLabelController) 

// Delete label router
appRouter.post('/label/deletelabel', authObj.isAuthorized, labelController.deleteLabelController)

// Notes count router
appRouter.post('/note/countnotes', authObj.isAuthorized, noteController.noteCount)          

// Search notes
appRouter.post('/note/searchnotes', authObj.isAuthorized, noteController.searchController)         
// Find latest notes
appRouter.post('/note/latestnotes', authObj.isAuthorized, noteController.latestNotes)          

module.exports = appRouter;