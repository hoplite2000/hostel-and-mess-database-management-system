import express from "express";
import { protect, admin } from "../middleware/authmiddleware.js";
const Roomrouter = express.Router();
import { getRoombyId, getRooms, addRoomset, deleteRoomset, searchRooms, getallRooms } from '../controllers/roomcontroller.js';

Roomrouter.route('/').get(protect, getRooms).post(protect, admin, addRoomset).delete(protect, admin, deleteRoomset);
Roomrouter.route('/all').get(protect, getallRooms);
Roomrouter.route('/search').post(protect, searchRooms);
Roomrouter.route('/:id').get(protect, getRoombyId);

export default Roomrouter;
