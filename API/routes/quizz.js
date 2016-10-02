import express from 'express';
import quizzCtrl from './../controllers/quizz';
import connectionCtrl from './../controllers/connection';

const router = express.Router();

router.route('/').get(
    connectionCtrl.isAdmin,
    quizzCtrl.getAll
);

router.route('/waiting').get(
    (req, res, next) => { req.state = 'waiting'; },
    connectionCtrl.isAdmin,
    quizzCtrl.getByState
);

router.route('/todo').get(
    (req, res, next) => { req.state = 'todo'; },
    connectionCtrl.isConnected,
    quizzCtrl.getByState
);

router.route('/done').get(
    (req, res, next) => { req.state = 'done'; },
    connectionCtrl.isAdmin,
    quizzCtrl.getByState
);

router.route('/add').post(
    connectionCtrl.isAdmin,
    quizzCtrl.add
);

router.route('/update').post(
    connectionCtrl.isAdmin,
    quizzCtrl.update
);

router.route('/delete').post(
    connectionCtrl.isAdmin,
    quizzCtrl.remove
);

export default router;
