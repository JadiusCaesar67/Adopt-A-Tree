import { connectDatabase } from  "./pool.js";
import  bodyParser  from  "body-parser";
import  express from  "express"
import  bcrypt  from  "bcryptjs"
import { auth } from  "./middleware/auth.js"
import { generateJwt } from "./jwt/jwtGenerator.js";
import cors from "cors"
// import { createServer } from "http";
import { Server } from "socket.io";
import userRoute from "./routes/users.js"
import conversationRoute from "./routes/conversation.js";
import messageRoute from "./routes/messages.js";
import photos from "./routes/photos.js"
import posts from "./routes/post.js"

const  pool = connectDatabase()
const  app = express()
const  PORT = 8000
// const server = createServer(app);

//static
app.use(express.json())
app.use(bodyParser.urlencoded({ extended:  true }))
app.use(cors())
app.use('/img', express.static('public/images')) 

//socket io server
const io = new Server(5000, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

let users = [];

// const addUser = (userId, socketId) => {
//         !users.some((user) => user.userId === userId) &&
//       users.push({ userId, socketId });
//   };

// const removeUser = (socketId) => {
//     users = users.filter((user) => user.socketId !== socketId);
//   };
  
// const getUser = (userId) => {
//     return users.find((user) => user.userId === userId);
//   };

io.on("connection", (socket) => { 
    //when a user connects
    console.log("a user has connected.") 
    // io.emit ("welcome", "Hello socket io")
    // //take userId and socketId from user
    // socket.on("addUser", (userId) => {
    //     addUser(userId, socket.id);
    //     io.emit("getUsers", users);
    //   });

        // send and get message
    // socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    //     const user = getUser(receiverId);
    //     io.to(user.socketId).emit("getMessage", {
    //     senderId,
    //     text,
    //     });
    // });

    //when disconnect
    // socket.on("disconnect", () => {
    //     console.log("a user disconnected!");
    //     removeUser(socket.id);
    //     io.emit("getUsers", users);
    // });





    // // Join a conversation
    // const { roomId } = socket.handshake.query;
    // socket.join(roomId);
    // console.log(roomId)
  
    // // Listen for new messages
    // socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    //   io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    // });
  
    // // Leave the room if the user closes the socket
    // socket.on("disconnect", () => {
    // console.log(`Client ${socket.id} diconnected`)
    //   socket.leave(roomId);
    // });


  });

//routes
app.use("/users", userRoute);
app.use("/photos", photos)
app.use("/posts", posts)
app.use("/conversations", conversationRoute)
app.use("/messages", messageRoute)


// provide the auth middleware for verification
app.get('/verify', auth, async (req, res) => {
    try {
        //return verify if true
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            msg: "Unauthenticated"
        });
    }
})

app.post('/register', async (req, res) => {
    try {
        const { username, firstname, lastname, email, gender, address, user_type, password } = req.body
        console.log("registration attempt:")
        //check if user or email exists
        const user = await pool.query(`SELECT * FROM users WHERE username = '${username}' OR email = '${email}'`)
        if (user.rows.length > 0) {
            res.send("User already exists")
            console.log("failed; user already exists")
        }
        
        //setup bcrypt
        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound)
 
        const bcryptPassword = await bcrypt.hash(password, salt)
 
        console.log("password encrypted")
 
        //add new user to the database
        const newUser = await pool.query(`
        INSERT INTO users (username, first_name, last_name, email, gender, address, user_type, password)
        VALUES ('${username}', '${firstname}', '${lastname}', '${email}', '${gender}', '${address}', '${user_type}', '${bcryptPassword}') RETURNING *
        `)
 
        const token = generateJwt(newUser.rows[0])
 
        res.json({ token })
        console.log("success")
 
    } catch (error) {
        res.json({ msg: error.message })
    }
})
 
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await pool.query(`SELECT * FROM users WHERE username = '${username}'`)
        console.log("login attempt: ")
        // console.log(user.rows)
        if (user.rows.length === 0) {
            res.send("User does not exist")
            console.log("failed; user don't exist")
        }
        else {
            //check the validity of password
            const validPassword = await bcrypt.compare(password, user.rows[0].password)
    
            if (!validPassword) {
                console.log("failed; invalid username or password")
                return res.status(401).json("Password or Username is Incorrect")
            }
    
            const token = generateJwt(user.rows[0])
            res.json({ token })
            console.log("success")
        }

    } catch (error) {
        res.json({ msg: error.message })
    }
})
 
app.get('/profile', auth, async (req, res) => {
    try {
        // const { username, firstname, lastname, email, gender, address, user_type } = req.body
        //return the user object
        // console.log(req.user)
        
        res.json(req.user)
    } catch (error) {
        console.error(error.message);
    }
})

// app.post('/upload_avatar', auth, upload.single("avatar"), async (req, res) => {
//     try {
//         const id = req.user.id
//         const { filename } = req.file
//         console.log(filename);

//         //checks if id exists already
//         const image = await pool.query(`SELECT * FROM pictures WHERE id = '${id}'`)
//         // console.log(image.rows[0].avatar)
//         if (image.rows.length === 0){
//             await pool.query(`
//             INSERT INTO pictures (id, avatar) VALUES
//             ( '${id}', '${filename}') RETURNING * `)
//             // res.json({ newPicture })
//             console.log("Avatar upload success")
//             res.send("Avatar upload success")
//         }

//         else if (image.rows[0].id === id) {
//             if (fs.existsSync(`./public/images/${image.rows[0].avatar}`)) {
//                 fs.unlinkSync(`./public/images/${image.rows[0].avatar}`);
//                 console.log("File removed if:", image.rows[0].avatar);
//             }
//             await pool.query(`UPDATE pictures 
//             SET avatar = '${filename}' WHERE id = '${id}'`)
//             res.send("Updated Avatar")
//             console.log("Updated Avatar")
//         }
        
//     } catch (error) {
//         console.error(error.message)
//     }
// })

// app.get('/avatar', auth, async (req, res) => {
//     try {
//         const id = req.user.id
//         const response = await pool.query(`
//         SELECT * FROM pictures WHERE id = '${id}'
//         `)
//         res.json(response.rows[0].avatar)
//         // console.log(response.rows[0].avatar)

//     } catch (error) {
//         console.log(error.message)
//     }
// })

// app.post('/photos', auth, upload.none("photos"), async (req, res) => {
//     try {
//         const id = req.user.id
//         // const { filename } = req.file
//         //checks if id exists already
//         const image = await pool.query(`SELECT * FROM pictures WHERE id = '${id}'`)
//         console.log(image.rows[0])
//         if (image.rows.length === 0){
//             // await pool.query(`
//             // INSERT INTO pictures (id, photos) VALUES
//             // ( '${id}', '${filename}') RETURNING * `)
//             // res.json({ newPicture })
//             console.log("Photo upload success")
//             res.send("Photo upload success")
//         }

//         else  {
//             // await pool.query(`
//             // INSERT INTO pictures (id, photos) VALUES
//             // ( '${id}', '${filename}') RETURNING * `)
//             res.send("User 1st Photo upload success")
//             console.log("User 1st Photo upload success")

//         }
        
//     } catch (error) {
//         console.log(error.message)
//     }
// })

// app.get('/photos', auth, async (req, res) => {
//     try {
//         const id = req.user.id
//         const images = await pool.query(`
//         SELECT * FROM pictures WHERE id = '${id}'
//         `)
//         res.json(images.rows[0].avatar)
//         console.log(images.rows[0].avatar)

//     } catch (error) {
//         console.log(error.message)
//     }
// })

// app.post('/posts', auth, async (req, res) => {
//     try {
//         const user_id = req.user.id
//         const { note } = req.body
//         const posting = await pool.query(`
//         INSERT INTO posts (user_id, post_description, date_posted) VALUES
//         ('${user_id}', '${note}', CURRENT_TIMESTAMP) RETURNING *
//         `)
//         console.log("Posted")
//         res.json(posting.rows);
//     } catch (error) {
//         console.log(error.message)
//     }
// })

// app.get('/posts', auth, async (req, res) => {
//     try {
//         // const newinfo = req.user.id
//         // console.log(newinfo)
//         const posts = await pool.query(`
//         SELECT * FROM posts INNER JOIN
//         users ON
//         posts.user_id = users.id`)
//         // const ids = posts.rows.map((obj) => obj);
//         console.log(posts.rows)
//         res.json(posts.rows)

//     } catch (error) {
//         console.error(error.message);
//     }
// })



// server.listen(5000, () => {
//     console.log('Server io listening on http://localhost:5000');
//   });

pool.connect((err) => {
	if (err) {
		console.log(err)
	}
	else {
		app.listen(PORT, () => {
			console.log(`Server has started on http://localhost:${PORT}`)
		})
	}
})