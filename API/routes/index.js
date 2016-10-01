import express from 'express';
import exampleRoutes from './example';
import connexionRoutes from './connexion';
import quizzRoutes from './quizz';

const router = express.Router();

router.get('/health-check', (req, res) => {
    res.send('OK');
});

router.use('/example', exampleRoutes);
router.use('/connexion', connexionRoutes);
router.use('/quizz', quizzRoutes);

export default router;
