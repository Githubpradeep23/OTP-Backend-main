const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController')
const auth = require('../middleware/auth')

router.post('/signup', userController.signup)
router.post('/signupVerify', userController.signupVerify)
router.post('/signin', userController.signin)
router.post('/signinVerify', userController.signinVerify)
router.post('/registerUser', userController.registerUser)
router.post('/resendOtp', userController.signup)





// ****************Home Page Api start*******************
router.post('/categoryBanner',  userController.categoryBanner)
router.get('/allTestimonials',  userController.allTestimonials)
router.post('/categoryTestimonials',  userController.categoryTestimonials)
router.get('/allBanners',  userController.allBanners)
router.get('/allServices',  userController.allServices)
router.post('/categoryServices',  userController.categoryServices)
router.post('/addTrackTrace',  userController.addTrackTrace)
router.post('/userTrackTraceList',  userController.userTrackTraceList)
router.post('/userTrackTraceListGraph',  userController.userTrackTraceListGraph)
router.post('/updatePushNotificationToken',  userController.updatePushNotificationToken)

router.post('/getPushNotificationData',  userController.getPushNotificationData)

router.post('/updatePushNotificationData',  userController.updatePushNotificationData)






// ****************Home Page Api end*********************

// ****************Account Page Api start*****************
router.post('/getUserProfile',  userController.getUserProfile)
router.post('/updateUserProfile',  userController.updateUserProfile)
router.post('/addTempUser', userController.addTempUser);
router.get('/getUsers/:type', userController.getUserByType);
// ****************Account Page Api end*******************

// ****************Fitness Page Api start*****************
router.post('/branchDetailsBySerivceName',  userController.branchDetailsBySerivceName)
router.get('/allGymBranches',  userController.allGymBranches)
router.post('/addPersonalInfo',  userController.addPersonalInfo)
router.post('/bookingDemoByUser',  userController.bookingDemoByUser)
router.get('/demoBooking/service',  userController.demoBookingByService)
router.post('/bookingPackageByUser',  userController.bookingPackageByUser)
router.post('/paymentBuyUser',  userController.paymentBuyUser)
router.post('/GymBranchesByServiceName',  userController.GymBranchesByServiceName)
router.post('/getUserOrderList',  userController.getUserOrderList)
router.post('/getAllOrdersByUserid',  userController.getAllOrdersByUser)
router.post('/getAllActiveOrdersById',  userController.getAllBookPackageByUser)

router.post('/getUserActiveOrderList',  userController.getUserActiveOrderList)

// ****************Fitness Page Api end*******************

// ****************Support Page Api start*****************
router.get('/allFaqs',  userController.allFaqs)
router.post('/createFaq', userController.createFaq)
router.get('/termCondtionAndPrivacyPolicy',  userController.termCondtionAndPrivacyPolicy)
router.post('/createTermCondtionAndPrivacyPolicy', userController.createTermCondtionAndPrivacyPolicy)
router.post('/allUserQueries',  userController.allUserQueries)
router.post('/createUserQuery',  userController.createUserQuery)
router.post('/UserActivityAndRecords',  userController.UserActivityAndRecords)

router.post('/createUserComplain',  userController.createUserComplain)
router.post('/allUserComplains',  userController.allUserComplains)

// ****************Support Page Api end*****************

router.post('/serviceSlottimeById', userController.serviceSlottimeById)

router.post('/updateGymBranches', userController.updateGymBranches)


router.post('/bookingConsultantByUser',  userController.bookingConsultantByUser)


router.post('/addCoachTest', userController.addCoach)

router.post('/bookingCoach', userController.bookingCoach)

// ************Coins Api *****************
router.post('/applyCoin', userController.applyCoin)
router.post('/removeCoin', userController.removeCoin)
// ************Coins Api End *************

router.get('/user/:number', userController.getUserByPhoneNumber)
module.exports = router;
