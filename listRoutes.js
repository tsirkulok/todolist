const express = require("express")
const router = express.Router()
const todoController = require("./todoController")
const { error } = require("node:console")

router.get("/readAll", async(req,res)=>{
    try{
        const allTasks = await todoController.getAllTasks();
        res.json(allTasks);
    } catch(err){
        console.error(err);
        res.status(500).json({ "status": "error", "message": err.message });
    }
})

router.post("/add", async (req,res) =>{
    try{
    const task = req.body
    await todoController.addTask(task);
    res.status(200).json({"status": "succseful", "message":"Завдання успішно додано!"})
    } catch(err) {
        console.error(err);
        res.status(500).json({ "status": "error", "message": err.message });
    }
    
})

module.exports = router;                                                                                                                                                                                                      
