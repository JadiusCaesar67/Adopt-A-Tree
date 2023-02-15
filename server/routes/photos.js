import express from "express";
import { existsSync, unlinkSync } from "node:fs"
import { connectDatabase } from  "../pool.js";
import { auth } from  "../middleware/auth.js"
import { upload } from "../middleware/upload.js";

const router = express.Router();
const pool = connectDatabase()


router.post('/avatar', auth, upload.single("avatar"), async (req, res) => {
    try {
        const id = req.user.id
        const { filename } = req.file
        // console.log(filename);

        //checks if id exists already
        const image = await pool.query(`SELECT * FROM avatars WHERE user_id = '${id}'`)
        // console.log(image.rows[0].avatar)
        // console.log(image.rows[0])
        //if there is no user_id in the table
        if (image.rows.length === 0){
            await pool.query(`
            INSERT INTO avatars (user_id, avatar) VALUES
            ( '${id}', '${filename}') RETURNING * `)
            // res.json({ newPicture })
            console.log("Avatar upload success")
            res.json(image.rows[0].avatar);
        }
        //If avatar exist on user
        else if (image.rows[0].user_id === id) {
            if (existsSync(`./public/images/${image.rows[0].avatar}`)) {
                unlinkSync(`./public/images/${image.rows[0].avatar}`);
                console.log("File removed:", image.rows[0].avatar);
            }
            await pool.query(`UPDATE avatars 
            SET avatar = '${filename}' WHERE user_id = '${id}'`)
            // res.send(`Updated Avatars '${filename}'`)
            res.json(image.rows[0].avatar);
            console.log("Updated Avatar")
        }
        
        else {
            await pool.query(`
            INSERT INTO avatars (user_id, avatar) VALUES
            ( '${id}', '${filename}') RETURNING * `)
            console.log("First avatar upload success")
            res.json(image.rows[0].avatar);
        }
        console.log(image.rows[0].avatar);
    } catch (error) {
        console.error(error.message)
    }
})

router.get('/avatar', auth, async (req, res) => {
    try {
        const id = req.user.id
        const response = await pool.query(`
        SELECT * FROM avatars WHERE user_id = '${id}'
        `)
        res.json(response.rows[0].avatar)
        // console.log(response.rows[0].avatar)
        // console.log(response.rows[0].avatar)

    } catch (error) {
        // console.log(error.message)
    }
})

router.get('/avatar1s', async (req, res) => {
    try {
        const id = req.query.id
        const response = await pool.query(`
        SELECT * FROM avatars WHERE user_id = '${id}'
        `)
        res.json(response.rows[0].avatar)
    } catch (error) {
        console.error(error.message)
    }
})

// router.post('/posts', upload.array('photos', 12), async (req, res) => {
//     try {
//         const filename = req.files
//         let photos = filename.map((f) => f.filename);
//         // console.log(id)
//         console.log(photos);
//         // res.send("Multiple upload success")
//         res.json(photos)
//     } catch (error) {
//         console.log(error.message)
//     }
//   })

export default router;