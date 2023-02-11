import express from "express";
// import { existsSync, unlinkSync } from "node:fs"
import { connectDatabase } from  "../pool.js";
import { auth } from  "../middleware/auth.js"
// import { upload } from "../middleware/upload.js";

const router = express.Router();
const pool = connectDatabase()

router.post('/', auth, async (req, res) => {
    // console.log(req.body)
    try {
        const userId = req.user.id
        const { postId, text } = req.body
        const replacedText = text.replace(/'/g, "''"); //fixes text that has quotations
        // console.log(photos)

        const comments = await pool.query(`
        INSERT INTO comments (post_id, user_id, text, date_commented, date_comment_edited) VALUES
        ('${postId}', '${userId}', '${replacedText}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *
        `)
        res.json(comments.rows);

    } catch (error) {
        console.log(error.message)
    }
})

//Read
router.get('/', async (req, res) => {
    try {
        const postId = req.query.postId
        // console.log(postId)
        const comments = await pool.query(`
        SELECT * FROM comments 
        WHERE post_id = '${postId}' 
        ORDER BY date_commented DESC`)
        res.json(comments.rows)

    } catch (error) {
        console.error(error.message);
    }
})

export default router