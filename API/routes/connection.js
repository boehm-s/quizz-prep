import express from 'express';
import connexionCtrl from './../controllers/connection';

const router = express.Router();

router.route('/').post(
	connexionCtrl.connectToPrepIntra,
	connexionCtrl.findUser,
	connexionCtrl.userInfoFromPrepIntra,
	connexionCtrl.createUser
);

export default router;
