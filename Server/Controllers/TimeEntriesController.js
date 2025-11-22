import db from "../connectdb.js";
const addTimeEntry=async(req,res)=>{
    const {entry_id, employee_id, project_id, start_time, end_time } = req.body;
    const query = `INSERT INTO time_entries (entry_id,employee_id, project_id, start_time, end_time) VALUES (?,?,?,?,?)`;
    db.query(query, [entry_id,employee_id, project_id, start_time, end_time], (err, result) => {
        if (err) {
            console.error("Error inserting time entry: ", err);
            return res.status(500).send(err)
        }
        res.send('Time entry added successfully!');
    });
}
const getTimeentries=async(req,res)=>{
    db.query("select * from time_entries",(err,result)=>{
        if(err){
            res.send(500).json({error:err});
        }
        res.send(result);
    })
}
const deleteTimeEntries=async(req,res)=>{
    db.query('delete from time_entries;',(err,result)=>{
        if(err){
            res.send(500).json({error:err});
        }
        res.send(result);
    })
}
export { addTimeEntry,getTimeentries,deleteTimeEntries };