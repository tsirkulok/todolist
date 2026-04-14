const jwt = require("jsonwebtoken")
const db = require("../db/db")
const bcrypt = require("bcrypt")

const authController =  {
register: async (email, password, role,) =>{
    try{
    const hash = await bcrypt.hash(password, 10)
    const result = await db.execute("INSERT INTO users (email, password,role) VALUES (?,?,?)", [email,hash,role])        
    return result;
    }catch(err){
        console.error(err);
        throw err;

        
    }
},
login: async (email,password) =>{
    try{
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0]
    if(!user){
        throw new Error("Користувача не знайдено")
    };
    const isMatch = await bcrypt.compare(password,user.password)
    if(isMatch){
        const webToken = jwt.sign({id:user.id, role:user.role},process.env.JWT_SECRET,{expiresIn:"12h"})
        return {user,webToken};
    } else {throw new Error("Невірний пароль");}
    
    }catch(err){
        console.error(err);
        throw err;

    }
}
}
module.exports = authController;