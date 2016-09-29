import express from 'express';
import exampleRoutes from './example';
import prepintra from './prepintra';

const router = express.Router();

router.get('/health-check', (req, res) => {
    res.send('OK');
});

router.use('/prepintra', prepintra);
router.use('/example', exampleRoutes);

export default router;
