import express from 'express';
import connectionRoutes from './connection';
import quizzRoutes from './quizz';

const router = express.Router();

router.get('/health-check', (req, res) => {
    res.send('OK');
});

router.use('/login', connectionRoutes);
router.use('/quizz', quizzRoutes);

export default router;
