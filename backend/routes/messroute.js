import express from "express";
import { protect } from "../middleware/authmiddleware.js";
const Messrouter = express.Router();
import { getMessbyId, getMesses, updateMess, deleteMess, addMess, searchMess } from '../controllers/messcontroller.js';

Messrouter.route('/').get(protect, getMesses).post(protect, addMess);
Messrouter.route('/search').post(protect, searchMess);
Messrouter.route('/:id').get(protect, getMessbyId).put(protect, updateMess).delete(protect, deleteMess);

export default Messrouter;
