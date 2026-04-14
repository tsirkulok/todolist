const jwt = require("jsonwebtoken")
const verify = (req,res,next) =>{
    try{
    const authHeader = req.headers.authorization
    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded;
    next();
}catch(err){
    console.error(err);
    res.status(401).json({"status":"error", "message":"зарєєструйтесь або ввійдіть будь ласка"})
}
}
module.exports = verify;