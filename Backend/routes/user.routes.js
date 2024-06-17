
import { Router } from 'express';
import { LoginUser, LogoutUser, registerUser } from '../controllers/user.controller.js'; // corrected path
import { verifyJWT } from '../middlerware/authrization.js';
import { Doc_info } from '../Api/DocApi.js';
import {Hospitla_info} from '../Api/Hospital.js'
import { createSlotTimeInfo } from '../controllers/user.controller.js';
import { SearchTimeSlot } from '../controllers/user.controller.js';
import { getAllSlots } from '../controllers/user.controller.js';



const router = Router();

router.post('/register', registerUser);

router.post('/login' , LoginUser)

router.post('/logout' , verifyJWT , LogoutUser)

router.get('/doctor' , Doc_info)

router.get('/hospital' , Hospitla_info )

router.get('/slot/check' , SearchTimeSlot)

router.post('/slot' , createSlotTimeInfo)

router.get('/slots' , getAllSlots )


export default router;
