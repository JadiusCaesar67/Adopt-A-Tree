import  jwt  from  "jsonwebtoken"
import  dotenv  from  "dotenv"
dotenv.config();

const  generateJwt = (user) => {
	return  jwt.sign(user, process.env.jwtSecret, { expiresIn:  '8h' })
}
export { generateJwt }