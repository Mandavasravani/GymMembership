import db from '../connectdb.js';
const getAllProjects=async(req,res)=>{
    db.query("select * from projects;",(err,result)=>{
        if(err){
            console.log(err);
        }
        res.send(result);
    })
}
export { getAllProjects };
