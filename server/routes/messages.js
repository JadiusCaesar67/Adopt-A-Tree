import express from "express";
import { connectDatabase } from  "../pool.js";
const router = express.Router();
const  pool = connectDatabase()

//add
router.post("/", async (req, res) => {
    const { conversationId, sender, text } = req.body
    let rep_text = text.replace(/'/g, "''");
    try {
        const checkMessage = await pool.query(`SELECT * FROM conversations 
        WHERE conversation_id = '${conversationId}'`)
        // console.log(checkMessage.rows[0].conversation_id)
        // console.log(checkMessage.rows[0].members)
        if (checkMessage.rows[0].conversation_id) {
            // const savedMessage = await newMessage.save();
            const newMessage = await pool.query(`INSERT INTO messages (conversation_id, sender, text, created_at, updated_at)
            VALUES ('${conversationId}', '${sender}', '${rep_text}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`);
            console.log(newMessage.rows)
            res.status(200).json(newMessage.rows);
        }

    } catch (err) {
        res.status(500).json(err);
        console.log(err.message)
    }
});

//get
router.get("/:conversationId", async (req, res) => {
  // console.log(req.params.conversationId)
  try {
    const conversation_id = req.params.conversationId
    const messages = await pool.query(`SELECT * FROM messages
    WHERE conversation_id = '${conversation_id}'`)
    res.status(200).json(messages.rows);
    // console.log(conversation_id)
  } catch (err) {
    // res.status(500).json(err);
    // console.log(conversation_id)
    console.log(err.message)
  }
});

export default router;