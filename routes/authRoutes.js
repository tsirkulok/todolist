const express = require("express")
const router = express.Router();
const authController = require("../controllers/authController")
const verify = require("../auth")
router.post("/reg", async (req,res) =>{
    try {
    const {email, password,role, secret} = req.body;
    let finalRole = "client"
    if(role === "admin" && secret === process.env.SECRET_PASS){
        finalRole = "admin"
    }
    const result = await authController.register(email,password,finalRole);
    res.status(201).json({ "status": "success", message: "Вас успішно зареєстровано!" })
    } catch(err) {
        res.status(500).json({ "status": "error", "message": err.message });
    }
})

router.post("/login", async(req,res)=>{
    try{
    const {email,password} = req.body;
    const result = await authController.login(email,password);
    const{user,webToken} = result;
    res.status(200).json({ "status": "success", "token":webToken,"user":{"email":user.email,"role":user.role}})
    }catch(err){
        console.error(err);
        res.status(401).json({ "status": "error", "message": err.message })
    }
})
router.get("/verify", verify,async (req,res)=>{
    res.json({"status":"succseful", user:req.user})
})
module.exports = router;