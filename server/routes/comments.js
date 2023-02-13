import express from "express";
// import { existsSync, unlinkSync } from "node:fs"
import { connectDatabase } from  "../pool.js";
import { auth } from  "../middleware/auth.js"
// import { upload } from "../middleware/upload.js";

const router = express.Router();
const pool = connectDatabase()

router.post('/', auth, async (req, res) => {
    try {
        const userId = req.user.id
        const { postId, text } = req.body
        const replacedText = text.replace(/'/g, "''"); //fixes text that has quotations
        // console.log(photos)
        console.log(req.body)

        const comments = await pool.query(`
        INSERT INTO comments (post_id, user_id, text, date_commented, date_comment_edited) VALUES
        ('${postId}', '${userId}', '${replacedText}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *
        `)
        res.json(comments.rows);
        res.json(text);
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
        SELECT comments.*, users.username FROM comments 
        JOIN users ON comments.user_id = users.id
        WHERE post_id = '${postId}' 
        ORDER BY date_commented DESC`)
        res.json(comments.rows)

    } catch (error) {
        console.error(error.message);
    }
})

//update
router.put('/', auth, async (req, res) => {
    try {
        // const user_id = req.user.id
        const commentId = req.query.commentId
        const { text } = req.body
        const newCommentText = text.replace(/'/g, "''")
        console.log(text)
        const updateComment = await pool.query(`
        UPDATE comments
        SET text = '${newCommentText}',
            date_comment_edited = CURRENT_TIMESTAMP
        WHERE comment_id = '${commentId}' RETURNING *`)
        console.log(updateComment.rows[0])
        res.json(updateComment.rows[0]);
    } catch (error) {
        console.log(error.message)
    }
})

//Delete
router.delete('/', auth, async (req, res) => {
    try {
        const commentId = req.query.commentId
        console.log(commentId)
        const deleteComment = await pool.query(`
        DELETE FROM comments 
        WHERE '${commentId}' = comment_id 
        RETURNING *`)
        res.json(deleteComment.rows[0])
        console.log(deleteComment.rows[0])

        // res.json(commentId)
    } catch (error) {
        console.log(error.message)
    }
})

export default router;