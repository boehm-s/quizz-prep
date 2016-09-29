import express from 'express';
import prepintraCtrl from './../controllers/prepintra';
import dbCtrl from './../controllers/dbOperations';

const router = express.Router();

router.route('/connexion')
    .post(prepintraCtrl.connexion, dbCtrl.registerUser);

export default router;
