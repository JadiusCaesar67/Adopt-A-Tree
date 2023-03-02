import express from "express";
import { connectDatabase } from  "../pool.js";
import { auth } from  "../middleware/auth.js";
import { existsSync, unlinkSync } from "node:fs"
const router = express.Router();
const  pool = connectDatabase();


router.get('/', auth, async (req, res) => {
    try {
        const checkUser = await pool.query(`
            SELECT * FROM users 
            INNER JOIN avatars ON users.id = avatars.user_id
            WHERE users.id = ${req.user.id}
        `)

        let user;
        if (checkUser.rows.length === 0) {
            user = await pool.query(`
            SELECT * FROM users
            WHERE users.id = ${req.user.id}
        `)
        } else {
            user = await pool.query(`
            SELECT * FROM users 
            INNER JOIN avatars ON users.id = avatars.user_id
            WHERE users.id = ${req.user.id}
        `)
        }
        res.json(user.rows[0])
        // console.log(user.rows[0])
        // res.json(req.user)
    } catch (error) {
        console.error(error.message);
    }
})

//update
router.put('/edit', auth, async (req, res) => {
    try {
        // console.log(req.body.formData)
        // const userId = req.user.id;
        const { id, username, firstName, lastName, address, email } = req.body.formData;
        const updatedUser = await pool.query(`
            UPDATE users
            SET username = '${username}',
            first_name = '${firstName}',
            last_name = '${lastName}',
            address = '${address}',
            email = '${email}'
            WHERE id = '${id}' RETURNING *
        `)
        // console.log(updatedUser.rows)
        if (updatedUser.rows.length === 0) {
          res.status(404).json({ error: 'User not found' });
        } else {
          res.json(updatedUser.rows[0])
        }
        // res.json(req.body.formData)
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
})

//Delete
router.delete('/delete', auth, async (req, res) => {
    try {
        let photos;
        const userId = req.user.id;
        const checkExistingAvatar = await pool.query(`SELECT avatar FROM avatars WHERE user_id = '${userId}'`);
        if (checkExistingAvatar.rows.length !== 0) {
            photos = checkExistingAvatar.rows[0].avatar;
            if (existsSync(`./public/images/${photos}`)) {
                unlinkSync(`./public/images/${checkExistingAvatar.rows[0].avatar}`);
                console.log(photos, "AVATAR REMOVED");
            }
        }

        const checkExistingPosts = await pool.query(`SELECT * FROM posts WHERE user_id = '${userId}'`);
        if (checkExistingPosts.rows.length !== 0) {
            const checkExistingPhotos = await pool.query(`SELECT pictures FROM posts WHERE user_id = '${userId}'`);
            photos = checkExistingPhotos.rows[0].pictures;
            for (var i = 0; i < photos.length; i++) {
                if (existsSync(`./public/images/${photos[i]}`)) {
                    unlinkSync(`./public/images/${photos[i]}`);
                    console.log(photos[i], "PHOTOS REMOVED");
                }
            }
        }
        const deleteAccount = await pool.query(`
            DELETE FROM users 
            WHERE id = '${userId}'
            RETURNING *
        `);
        console.log(`ACCOUNT ${deleteAccount.rows[0].username} HAS BEEN DELETED!!!`);
        res.status(410).json({ data : deleteAccount.rows[0], message: "Account Successfully Deleted" });
    } catch (error) {
        console.log(error.message);
    }
})

export default router;