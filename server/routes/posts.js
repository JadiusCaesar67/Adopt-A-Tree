import express from "express";
import { existsSync, unlinkSync } from "node:fs"
import { connectDatabase } from  "../pool.js";
import { auth } from  "../middleware/auth.js"
import { upload } from "../middleware/upload.js";

const router = express.Router();
const  pool = connectDatabase()

//Test
router.post('/test', auth, async (req, res) => {
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
        const checkExistingTreeName = await pool.query(`SELECT * FROM trees WHERE name = '${name}'`)
        // console.log(tree_descr)
        // const checkExistingTreeNameDescr = await pool.query(`SELECT tree_description FROM trees WHERE name = '${name}'`)
        // console.log(checkExistingTreeName.rows[0].name)
        // console.log(checkExistingTreeName.rows[0].tree_description)

        if (checkExistingTreeName.rows.length === 0){
            if (tree_name && tree_descr){
                await pool.query(`
            INSERT INTO trees (name, tree_description) VALUES
            ('${name}', '${tree_descr}') RETURNING *
            `)
            }
        }
        else {
                checkExistingTreeName.rows[0].treeDescription === 0? (await pool.query(`
                UPDATE trees SET tree_description = '${tree_descr}' 
                WHERE name = '${name}' RETURNING *
                `)) 
                : 
                (await pool.query(`
                UPDATE trees SET tree_description = '${tree_descr + ' |&&| ' + checkExistingTreeName.rows[0].treeDescription}' 
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

//Create
router.post('/', auth, upload.array("photos", 3), async (req, res) => {
    try {
        const user_id = req.user.id
        const { tree_name, treeDescription, note } = req.body
        const rep_text_note = note.replace(/'/g, "''")
        const filenames = req.files
        const photos = filenames.map((f) => f.filename)

        //Check if tree name already existed
        const checkExistingTreeName = await pool.query(`SELECT * FROM trees WHERE name = '${tree_name}'`)
        // console.log(tree_descr)
        // const checkExistingTreeNameDescr = await pool.query(`SELECT tree_description FROM trees WHERE name = '${name}'`)
        // console.log(checkExistingTreeName.rows.length === null)
        
        let tree;
        //if tree name is non existent then the new data is inserted else it would proceed to tree description
        if (checkExistingTreeName.rows.length === 0){
            if (tree_name && treeDescription){
                tree = await pool.query(`
                INSERT INTO trees (name, tree_description, created_at) VALUES
                ('${tree_name}', '${treeDescription}', CURRENT_TIMESTAMP) RETURNING *
            `)
            } else {
                tree = await pool.query(`
                INSERT INTO trees (name, created_at) VALUES
                ('${tree_name}', CURRENT_TIMESTAMP) RETURNING *
            `)
            }
        }   //check if there is content in tree description 
            else if (treeDescription) {
                tree =
                    checkExistingTreeName.rows[0].treeDescription === null ? 
                    ( await pool.query(`
                        UPDATE trees 
                        SET tree_description = '${treeDescription}', 
                            updated_at = CURRENT_TIMESTAMP
                        WHERE name = '${tree_name}' RETURNING *
                    `)) 
                    : 
                    (await pool.query(`
                        UPDATE trees 
                        SET tree_description = '${treeDescription + '|&&| New Info Description |&&|' + checkExistingTreeName.rows[0].tree_description}', 
                            updated_at = CURRENT_TIMESTAMP 
                        WHERE name = '${tree_name}' RETURNING *
                    `))
            } else {
                tree = checkExistingTreeName;
            }

        // console.log(tree.rows[0].tree_id)
        const post = await pool.query(`
        INSERT INTO posts (user_id, post_description, pictures, tree_id, date_posted, date_edited, available) VALUES
        ('${user_id}', '${rep_text_note}', '{${photos}}', '${tree.rows[0].tree_id}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true) RETURNING *
        `)
        res.json(post.rows[0]);
        // console.log(post.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})

//Read
router.get('/', async (req, res) => {
    try {
        // const newinfo = req.user.id
        // console.log(newinfo)
        const posts = await pool.query(`
            SELECT posts.*, users.username, users.email, avatars.avatar 
            FROM posts 
            INNER JOIN users ON posts.user_id = users.id
            LEFT JOIN avatars ON users.id = avatars.user_id
            ORDER BY date_posted DESC`)
        // const ids = posts.rows.map((obj) => obj);
        // console.log(ids.date_posted)
        // console.log(typeof(ids.date_posted))
        res.json(posts.rows)

    } catch (error) {
        console.error(error.message);
    }
})

router.get('/own-posts', auth, async (req, res) => {
    try {
        const user_id = req.user.id
        const posts = await pool.query(`
        SELECT * FROM posts 
        WHERE user_id = '${user_id}' 
        ORDER BY date_posted DESC`)
        res.json(posts.rows)

    } catch (error) {
        console.error(error.message);
    }
})

//Update
router.put('/available', async (req, res) => {
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

router.put('/:id', async (req, res) => {
    try {
        console.log(req.body)
        const postId = req.params.id;
        const { updatedPost } = req.body;
        const newPost = await pool.query(`
        UPDATE posts
        SET post_description = '${updatedPost}',
            date_edited = CURRENT_TIMESTAMP
        WHERE post_id = '${postId}' RETURNING *`)
        // console.log(availability.rows[0])
        res.json(newPost.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
})

//Delete
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const postId = req.params.id;
        console.log(postId)
        const checkExistingPhotos = await pool.query(`SELECT pictures FROM posts WHERE post_id = '${postId}'`)
        const photos = checkExistingPhotos.rows[0].pictures
        for (var i = 0; i < photos.length; i++) {
            console.log(photos[i])
            if (existsSync(`./public/images/${photos[i]}`)) {
                unlinkSync(`./public/images/${photos[i]}`);
                console.log(photos[i], "REMOVED");
            }
        }
        const checkAvailableComments = await pool.query(`
            SELECT * FROM comments WHERE post_id = ${postId}
        `)

        let deletPost;
        if (checkAvailableComments.rows.length === 0) {
            deletPost = await pool.query(`
            DELETE FROM posts 
            WHERE '${postId}' = post_id 
            RETURNING *`
        )} else {
            deletPost = await pool.query(`
                DELETE FROM posts
                WHERE post_id IN (SELECT post_id FROM comments 
                WHERE post_id='${postId}') 
                RETURNING *
        `)}
        res.json(deletPost)
    } catch (error) {
        console.log(error.message)
    }
})

export default router