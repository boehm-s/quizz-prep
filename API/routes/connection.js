import express from 'express';
import connexionCtrl from './../controllers/connexion';

const router = express.Router();

router.route('/').post(
	connexionCtrl.connectToPrepIntra,
	connexionCtrl.findUser,
	connexionCtrl.userInfoFromPrepIntra,
	connexionCtrl.createUser
);

export default router;
