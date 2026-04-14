const express = require("express")
const router = express.Router()
const todoController = require("./todoController")
const { error } = require("node:console")
const e = require("express")
const { title } = require("node:process")
const { todo } = require("node:test")

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
    const task = req.body;
    await todoController.addTask(task);
    res.status(200).json({"status": "succseful", "message":"Завдання успішно додано!"})
    } catch(err) {
        console.error(err);
        res.status(500).json({ "status": "error", "message": err.message });
    }
    
})

router.delete("/delete/:id", async (req,res) =>{
    try{
        const id = req.params.id;
        const result = await todoController.deleteTask(id);
        if(result.affectedRows === 0){
            res.status(404).json({"status":"error", "message":"Ви ввели не те id"})
            return;
        } else{
        res.status(200).json({"status": "succseful", "message": `Завдання з id ${id} успішно видалено!`})
        }
    }catch(err){
        console.error(err);
        
        res.status(500).json({ "status": "error", "message": err.message });
    }
})
router.patch("/update/:id", async (req,res)=>{
    try{
        const id = req.params.id;
        const { title } = req.body;
        const result = await todoController.updateTask(title,id)
        if(result.affectedRows === 0){
            res.status(404).json({"status":"error", "message":"Ви ввели не те id"})
            return;
        } else{
        res.status(200).json({"status": "succseful", "message": `Завдання з id ${id} успішно змінено!`})
        }
        
    } catch(err) {
        console.error(err);
        res.status(500).json({ "status": "error", "message": err.message });
    
    }
})
router.patch("/update-status/:id", async (req,res)=>{
    try{
        const statuses = ["todo", "inprogress", "completed"]
        const id = req.params.id;
        const { status } = req.body;
        if (statuses.includes(status)){
        const result = await todoController.updateStatus(status,id)
        if(result.affectedRows === 0){
            res.status(404).json({"status":"error", "message":"Ви ввели не те id"})
            return;
        } else{
        res.status(200).json({"status": "succseful", "message": `Завдання з id ${id} успішно змінено!`})
        }
    } else {
        res.status(400).json({"status":"error","message":"Ви вказали не правильний статус"})
    }
    } catch(err) {
        console.error(err);
        res.status(500).json({ "status": "error", "message": err.message });
    
    }
})

module.exports = router;                                                                                                                                                                                                      
