import express from "express";
import { existsSync, unlinkSync } from "node:fs"
import { connectDatabase } from  "../pool.js";
import { auth } from  "../middleware/auth.js"
import { upload } from "../middleware/upload.js";

const router = express.Router();
const  pool = connectDatabase()

router.post('/', auth, upload.array("photos", 8), async (req, res) => {
    console.log(req.body)
    try {
        const user_id = req.user.id
        const { tree_name, tree_descr, note } = req.body
        let rep_text_note = note.replace(/'/g, "''");
        let name = tree_name.toLowerCase()
        const filenames = req.files
        console.log(req.body)
        const photos = filenames.map((f) => f.filename)
        // console.log(photos)
        const checkExisting = await pool.query(`SELECT * FROM trees WHERE name = '${name}'`)
        // console.log(tree_descr)
        // const checkExistingDescr = await pool.query(`SELECT tree_description FROM trees WHERE name = '${name}'`)
        // console.log(checkExisting.rows[0].name)
        // console.log(checkExisting.rows[0].tree_description)

        if (checkExisting.rows.length === 0){
            if (tree_name && tree_descr){
                await pool.query(`
            INSERT INTO trees (name, tree_description) VALUES
            ('${name}', '${tree_descr}') RETURNING *
            `)
            }
        }
        else {
                checkExisting.rows[0].tree_description === 0? (await pool.query(`
                UPDATE trees SET tree_description = '${tree_descr}' 
                WHERE name = '${name}' RETURNING *
                `)) 
                : 
                (await pool.query(`
                UPDATE trees SET tree_description = '${tree_descr + ' |&&| ' + checkExisting.rows[0].tree_description}' 
                WHERE name = '${name}' RETURNING *
                `))   
            }
            
        console.log(filenames)
            const posting = await pool.query(`
        INSERT INTO posts (user_id, post_description, pictures, tree_name, date_posted, date_edited, available) VALUES
        ('${user_id}', '${rep_text_note}', '{${photos}}', '${tree_name}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true) RETURNING *
        `)
        res.json(posting.rows);
        
        // console.log(photos)
        // res.json(req.body);
    } catch (error) {
        console.log(error.message)
    }
})

router.get('/', auth, async (req, res) => {
    try {
        // const newinfo = req.user.id
        // console.log(newinfo)
        const posts = await pool.query(`
        SELECT * FROM posts INNER JOIN
        users ON
        posts.user_id = users.id ORDER BY date_posted DESC`)
        const ids = posts.rows.map((obj) => obj);
        // console.log(ids.date_posted)
        // console.log(typeof(ids.date_posted))
        res.json(posts.rows)

    } catch (error) {
        console.error(error.message);
    }
})

router.put('/', async (req, res) => {
    try {
        // const user_id = req.user.id
        const post_id = req.query.post_id
        const { available } = req.body
        const availability = await pool.query(`
        UPDATE posts
        SET available = '${available}',
            date_edited = CURRENT_TIMESTAMP
        WHERE post_id = '${post_id}' RETURNING *`)
        // console.log(availability.rows[0])
        res.json(availability.rows[0].available);
    } catch (error) {
        console.log(error.message)
    }
})

router.delete('/delete', auth, async (req, res) => {
    try {
        const post_id = req.query.post_id
        console.log(post_id)
        const pg_photos = await pool.query(`SELECT pictures FROM posts WHERE post_id = '${post_id}'`)
        const photos = pg_photos.rows[0].pictures
        for (var i = 0; i < photos.length; i++) {
            console.log(photos[i])
            if (existsSync(`./public/images/${photos[i]}`)) {
                unlinkSync(`./public/images/${photos[i]}`);
                console.log(photos[i], "REMOVED");
            }
        }
        
        const delete_post = await pool.query(`
        DELETE FROM posts WHERE '${post_id}' = post_id RETURNING *`)
        res.json(delete_post.rows[0])
        console.log(delete_post.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})

router.get('/own-posts', auth, async (req, res) => {
    try {
        const user_id = req.user.id
        console.log(user_id)
        const posts = await pool.query(`
        SELECT * FROM posts 
        WHERE user_id = '${user_id}' 
        ORDER BY date_posted DESC`)
        // const ids = posts.rows.map((obj) => obj);
        // console.log(ids.date_posted)
        // console.log(typeof(ids.date_posted))
        res.json(posts.rows)

    } catch (error) {
        console.error(error.message);
    }
})

export default router