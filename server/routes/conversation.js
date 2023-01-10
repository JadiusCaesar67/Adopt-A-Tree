import express from "express";
import { connectDatabase } from  "../pool.js";
const router = express.Router();
const  pool = connectDatabase()
// import { auth } from "../middleware/auth"
//new conv

router.post("/", async (req, res) => {
    const  {senderId, receiverId}  = req.body
    console.log(req.body)
    try {  
    const newConversation = await pool.query(`
    INSERT INTO conversations (members, created_at, updated_at)
    VALUES (ARRAY ['${senderId}', '${receiverId}'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *
    `);
    // console.log(newConversation.rows)
    // const savedConversation = await newConversation.save();
    res.status(200).json(newConversation.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const savedConversation = req.params.userId
    const conversation = await pool.query(`SELECT * FROM conversations
    WHERE '${savedConversation}' =  ANY (members)`)
    res.status(200).json(conversation.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // get conv includes two userId

// router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
//   try {
//     const conversation = await Conversation.findOne({
//       members: { $all: [req.params.firstUserId, req.params.secondUserId] },
//     });
//     res.status(200).json(conversation)
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

export default router;