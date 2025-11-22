import db from '../connectdb.js';
const getAllEmployees=async(req,res)=>{
    db.query("select * from employees;",(err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result);
        res.send(result);
    })
}
const getEmployeeByProjectID=async(req,res)=>{
    console.log(req.params.projectID);
    db.query("SELECT * FROM employees WHERE project_id=?", [req.params.projectid],(err,result)=>{
        if(err){
            console.log(err);
        }
        console.log("result",result);
        res.send(result);
    })
}
const addEmployeesToProject=async(req,res)=>{
    const {employee_id, first_name, last_name, email, salary, department_id, project_id } = req.body;
    const query = `INSERT INTO employees (employee_id,first_name, last_name, email, salary, department_id, project_id) VALUES (?,?,?,?,?,?,?)`;
    db.query(query, [employee_id,first_name, last_name, email, salary, department_id, project_id], (err, result) => {
        if (err) {
            console.error("Error inserting employee: ", err);
            return res.status(500).send('Error inserting employee');
        }
        res.send('Employee added successfully!');
    });
}
const updateEmployee=async(req,res)=>{
    const query = `UPDATE employees SET first_name=?,last_name=?,email=?,salary=?,department_id=?,project_id=? WHERE employee_id=?`;
   db.query(query, [req.body.first_name, req.body.last_name, req.body.email, req.body.salary, req.body.department_id, req.body.project_id, req.params.id], (err, result) => {
    if (err) {
            console.error("Error updating employee: ", err);
            return res.status(500).send('Error updating employee');
        }
        res.send('Employee updated successfully!');
    });
}
const deleteEmployee=async(req,res)=>{
    db.query('DELETE FROM employees WHERE employee_id=?', [req.params.id], (err, result) => {
        if (err) {
            console.error("Error deleting employee: ", err);
            return res.status(500).send('Error deleting employee');
        }
        res.send('Employee deleted successfully!');
    });
}
export { getAllEmployees, addEmployeesToProject, updateEmployee, deleteEmployee,getEmployeeByProjectID };