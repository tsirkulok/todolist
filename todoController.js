const db = require("./db")
const todoController={
    getAllTasks: async () =>{
        //СТВОРЮЄМО SQL ЗАПИТ ДЛЯ ТОГО ЩОБ ПОЛУЧИТИ
        const [rows] = await db.execute("SELECT * FROM tasks");
        return rows;

    },
    addTask: async (task) =>{
        //СТВОРЮЄМО SQL ЗАПИТ ДЛЯ ВСТАВКИ
        const [result] = await db.execute("INSERT INTO tasks (title) VALUES (?)", [task.title])
        return result;
    }
}
module.exports = todoController;