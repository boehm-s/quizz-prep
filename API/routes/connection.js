import express from 'express';
import connectionCtrl from './../controllers/connection';

const router = express.Router();

router.route('/').post(
	connectionCtrl.connectToPrepIntra,
	connectionCtrl.findUser,
	connectionCtrl.userInfoFromPrepIntra,
	connectionCtrl.createUser
);

export default router;
