import express from 'express';
const router = express.Router();
import verify from './verifyToken';

router.get('/', verify, (req,res) => {
    const user = req.body.user;
    res.json({
        "user": user,
        "messege": "Acces Given"
    })
} );

export default router;
