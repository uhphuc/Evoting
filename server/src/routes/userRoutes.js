import express from 'express';
import * as userController from '../controllers/userController.js';
import adminMiddleware from '../middleware/admin_mw.js';
const router = express.Router();


router.get('/', adminMiddleware, userController.getAllUsers);
router.post('/voter', adminMiddleware,userController.createVoter);
router.post('/manager', adminMiddleware, userController.createManager);
router.get('/voters', adminMiddleware, userController.getVoters);
router.get('/managers', adminMiddleware, userController.getManagers);
router.get('/:id', adminMiddleware, userController.getUserById); 
router.put('/:id', adminMiddleware, userController.updateUser); 
router.delete('/:id', adminMiddleware, userController.deleteUser);


// export the router
export default router;
