import express from 'express';
import exampleRoutes from './example';
import connexion from './connexion';

const router = express.Router();

router.get('/health-check', (req, res) => {
    res.send('OK');
});

router.use('/connexion', connexion);
router.use('/example', exampleRoutes);

export default router;
