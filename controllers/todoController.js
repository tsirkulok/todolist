const db = require("../db/db")
const todoController={
    getAllTasks: async (userId) =>{
        //СТВОРЮЄМО SQL ЗАПИТ ДЛЯ ТОГО ЩОБ ПОЛУЧИТИ
        const sql = `
        SELECT tasks.* FROM tasks 
        JOIN projects ON tasks.project_id = projects.id 
        WHERE projects.client_id = ?
    `;
        const [rows] = await db.execute(sql,[userId]);
        return rows;

    },
    addTask: async (task) =>{
        //СТВОРЮЄМО SQL ЗАПИТ ДЛЯ ВСТАВКИ
        const [result] = await db.execute("INSERT INTO tasks (title, project_id) VALUES (?,?)", [task.title,task.project_id])
        return result;

    },
    deleteTask: async (id)=>{
        const [result] = await db.execute("DELETE FROM tasks WHERE id = ?", [id])
        return result;
    },
    updateTask: async (title,id)=> {
        const [result] = await db.execute("UPDATE tasks SET title = ? WHERE id = ? ", [title, id])
        return result;
    },
    updateStatus: async (status, id)=>{
        const [result] = await db.execute("UPDATE tasks SET status = ? WHERE id = ? ", [status,id])
        return result;
    }
}
module.exports = todoController;