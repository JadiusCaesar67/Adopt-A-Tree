// import  bcrypt  from  "bcryptjs"
// import { generateJwt } from "./jwt/jwtGenerator.js";
// import { connectDatabase } from  "./pool.js";
// import  express  from  "express"


// const  pool = connectDatabase()
// const  app = express()

// app.get('/verify', auth, async (req, res) => {
//     try {
//         //return verify if true
//         res.json(true);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send({
//             msg: "Unauthenticated"
//         });
//     }
// })

// app.post('/register', async (req, res) => {
//     try {
//         const { username, firstname, lastname, email, gender, address, user_type, password } = req.body
//         console.log("registration attempt:")
//         //check if user or email exists
//         const user = await pool.query(`SELECT * FROM users WHERE username = '${username}' OR email = '${email}'`)
//         if (user.rows.length > 0) {
//             res.send("User already exists")
//             console.log("failed; user already exists")
//         }
        
//         //setup bcrypt
//         const saltRound = 10
//         const salt = await bcrypt.genSalt(saltRound)
 
//         const bcryptPassword = await bcrypt.hash(password, salt)
 
//         console.log("password encrypted")
 
//         //add new user to the database
//         const newUser = await pool.query(`
//         INSERT INTO users (username, first_name, last_name, email, gender, address, user_type, password)
//         VALUES ('${username}', '${firstname}', '${lastname}', '${email}', '${gender}', '${address}', '${user_type}', '${bcryptPassword}') RETURNING *
//         `)
 
 
//         const token = generateJwt(newUser.rows[0])
 
//         res.json({ token })
//         console.log("success")
 
//     } catch (error) {
//         res.json({ msg: error.message })
//     }
// })
 
// app.post('/login', async (req, res) => {
//     try {
//         const { username, password } = req.body
//         const user = await pool.query(`SELECT * FROM users WHERE username = '${username}'`)
//         console.log("login attempt: ")
//         console.log(user.rows)
//         if (user.rows.length === 0) {
//             res.send("User does not exist")
//             console.log("failed; user don't exist")
//         }
//         else {
//             //check the validity of password
//             const validPassword = await bcrypt.compare(password, user.rows[0].password)
    
//             if (!validPassword) {
//                 console.log("failed; invalid username or password")
//                 return res.status(401).json("Password or Username is Incorrect")
//             }
    
//             const token = generateJwt(user.rows[0])
//             res.json({ token })
//             console.log("success")
//         }

//     } catch (error) {
//         res.json({ msg: error.message })
//     }
// })

// module.exports = router;