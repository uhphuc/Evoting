import {db} from '../database/drizzle.js';
import { users } from '../models/users.js';
import { rooms } from '../models/rooms.js';
import { roomMembers } from '../models/junctions.js';
import { eq, inArray } from 'drizzle-orm';


export const getAllRooms = async (req, res) => {
    try {
        const roomsList = await db.select().from(rooms);
        if (roomsList.length === 0) {
            return res.status(404).json({ success: false, message: 'No rooms found' });
        }
    
        res.status(200).json({ success: true, rooms: roomsList });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const getRoomByManagerId = async (req, res) => {
    const { managerId } = req.params;
    try {
        const room = await db.select().from(rooms).where(eq(rooms.managerId, managerId));
        if (room.length === 0) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }
    
        res.status(200).json({ success: true, room });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
export const getRoomById = async (req, res) => {
    const { id } = req.params;
    try {
        const room = await db.select().from(rooms).where(eq(rooms.id, id));
        if (room.length === 0) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }
    
        res.status(200).json({ success: true, room });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const createRoom = async (req, res) => {
    const { name, description, managerId } = req.body;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let roomCode = '';
    for (let i = 0; i < 6; i++) {
        roomCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    try {
        const newRoom = await db.insert(rooms).values({
            name,
            description,
            managerId,
            roomCode
        }).returning();

        res.status(201).json({ success: true, room: newRoom });
    } catch (error) {
        if (error.code === '23505') { // Unique violation
            return res.status(409).json({ success: false, message: 'Room already exists' });
        }
        res.status(500).json({ success: false, error: error.message });
    }
}

export const VoterJoinGroup = async (req, res) => {
    const { roomCode, userId } = req.body;
    try {
        const room = await db.select().from(rooms).where(eq(rooms.roomCode, roomCode));
        if (room.length === 0) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }
    
        const user = await db.select().from(users).where(eq(users.id, userId));
        if (user.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const existingMember = await db.select().from(roomMembers).where(
            eq(roomMembers.userId, userId),
            eq(roomMembers.roomId, room[0].id)
        );
        if (existingMember.length > 0) {
            return res.status(409).json({ success: false, message: 'User already a member of the room' });
        }

        const newMember = await db.insert(roomMembers).values({
            userId,
            roomId: room[0].id
        }).returning();

        res.status(201).json({ success: true, member: newMember });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
// get room by member id

export const getRoomByMemberId = async (req, res) => {
    const { memberId } = req.params;

    try {
        const roomMemberships = await db
            .select()
            .from(roomMembers)
            .where(eq(roomMembers.userId, Number(memberId))); // Ensure memberId is a number

        if (roomMemberships.length === 0) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }

        const roomIds = roomMemberships.map(rm => rm.roomId);

        const roomDetails = await db
            .select()
            .from(rooms)
            .where(inArray(rooms.id, roomIds));

        res.status(200).json({ success: true, rooms: roomDetails });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};