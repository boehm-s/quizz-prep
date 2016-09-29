import express from 'express';
import prepintraCtrl from './../controllers/prepintra';

const router = express.Router();

router.route('/connexion')
    .post(prepintraCtrl.connexion);

export default router;
