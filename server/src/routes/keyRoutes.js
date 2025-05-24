import express from 'express';
import * as keyController from '../libs/paillierKeys.js';

const router = express.Router();

router.get('/public-key', (req, res) => {
  const pubKey = keyController.getPublicKey();

  if (!pubKey) {
    return res.status(503).json({ success: false, message: 'Keys not yet generated' });
  }
  res.json({
    success: true,
    publicKey: {
      n: pubKey.n.toString(), 
      g: pubKey.g.toString()  
    }
  });
});


export default router;
