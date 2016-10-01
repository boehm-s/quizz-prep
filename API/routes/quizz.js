import express from 'express';
import quizzCtrl from './../controllers/quizz';
import connexionCtrl from './../controllers/connexion';

const router = express.Router();

router.route('/').get(
    connexionCtrl.isAdmin,
    quizzCtrl.getAll
);

router.route('/waiting').get(
    (req, res, next) => { req.state = 'waiting'; },
    connexionCtrl.isAdmin,
    quizzCtrl.getByState
);

router.route('/todo').get(
    (req, res, next) => { req.state = 'todo'; },
    connexionCtrl.isConnected,
    quizzCtrl.getByState
);

router.route('/done').get(
    (req, res, next) => { req.state = 'done'; },
    connexionCtrl.isAdmin,
    quizzCtrl.getByState
);

router.route('/add').post(
    connexionCtrl.isAdmin,
    quizzCtrl.add
);

router.route('/update').post(
    connexionCtrl.isAdmin,
    quizzCtrl.update
);

router.route('/delete').post(
    connexionCtrl.isAdmin,
    quizzCtrl.remove
);

export default router;


















