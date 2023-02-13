import { connectDatabase } from  "./pool.js";
import  bodyParser  from  "body-parser";
import  express from  "express"
import  bcrypt  from  "bcryptjs"
import { auth } from  "./middleware/auth.js"
import { generateJwt } from "./jwt/jwtGenerator.js";
import cors from "cors";
// import { createServer } from "http";
import { Server } from "socket.io";
import userRoute from "./routes/users.js";
import conversationRoute from "./routes/conversation.js";
import messageRoute from "./routes/messages.js";
import photosRoute from "./routes/photos.js";
import postsRoute from "./routes/post.js";
import commentsRoute from "./routes/comments.js";

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
// const io = new Server(5000, {
//     cors: {
//       origin: "http://localhost:3000",
//     },
//   });

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

// io.on("connection", (socket) => { 
    //when a user connects
    // console.log("a user has connected.") 
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


//   });

//routes
app.use("/users", userRoute);
app.use("/photos", photosRoute)
app.use("/posts", postsRoute)
app.use("/comments", commentsRoute)
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
        const { username, firstname, lastname, email, gender, address, password } = req.body
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
        INSERT INTO users (username, first_name, last_name, email, gender, address, password)
        VALUES ('${username}', '${firstname}', '${lastname}', '${email}', '${gender}', '${address}', '${bcryptPassword}') RETURNING *
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
