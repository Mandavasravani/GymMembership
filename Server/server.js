import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import db from './connectdb.js';
import { addEmployeesToProject, deleteEmployee, getAllEmployees, getEmployeeByProjectID, updateEmployee } from './Controllers/EmployeeController.js';
import { addTimeEntry, deleteTimeEntries, getTimeentries } from './Controllers/TimeEntriesController.js';
import { getAllProjects } from './Controllers/ProjectController.js';
const app= express();
app.use(express.json());
app.use(cors());
dotenv.config();
const PORT= process.env.PORT || 4173;
app.get("/api/allemployees",getAllEmployees);
app.get("/api/employees/:projectid",getEmployeeByProjectID)
app.put("/api/updateemployee/:id", updateEmployee);
app.delete("/api/deleteemployee/:id",deleteEmployee);
app.post("/api/addemployee", addEmployeesToProject);
app.post("/api/addTimeEntry",addTimeEntry);
app.get("/api/getTimeEntries", getTimeentries);
app.delete('/api/deleteTimeEntries',deleteTimeEntries);
app.get('/api/projects',getAllProjects);
app.listen(PORT, ()=>{
    try{
        console.log(`Server is running on ${PORT}`)
    }catch(err){
        console.log(err);
    }
})