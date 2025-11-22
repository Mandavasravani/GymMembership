import { Button, Input } from "@material-tailwind/react"
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const AddMembership=({value})=>{
    const handleEmployee=async(e)=>{
        e.preventDefault();
        const password=prompt("Enter Admin password");
        if(password!='nanna143'){
            value();
            toast.error("Invalid hr password");
            return;
        }
        const result=await axios.post('http://localhost:4173/api/addemployee',employeedata);
        value();
        toast.success(result?.data);
        setEmployeedata({employee_id:0,first_name:"",last_name:"",email:"",salary:0,department_id:0,project_id:0});
    }
    const [employeedata,setEmployeedata]=useState({employee_id:0,first_name:"",last_name:"",email:"",salary:0,department_id:0,project_id:0});
    return(
        <div className="bg-white flex flex-col gap-4 p-10 rounded-md">
            <Input type="text" label="Membership_ID" value={employeedata?.employee_id} name="employee_id" size="md" onChange={(e)=>setEmployeedata({...employeedata,[e.target.name]:e.target.value})}/>
            <Input type="text" label="first_name" value={employeedata?.first_name} name="first_name" size="md" onChange={(e)=>setEmployeedata({...employeedata,[e.target.name]:e.target.value})}/>
            <Input type="text" label="last_name" value={employeedata?.last_name} name="last_name" size="md" onChange={(e)=>setEmployeedata({...employeedata,[e.target.name]:e.target.value})}/>
            <Input type="text" label="email" name="email" value={employeedata?.email} size="md" onChange={(e)=>setEmployeedata({...employeedata,[e.target.name]:e.target.value})}/>
            <Input type="number" label="Plan_Price" name="salary" size="md" value={employeedata?.salary} onChange={(e)=>setEmployeedata({...employeedata,[e.target.name]:e.target.value})} />
            <Input type="number" label="Plan_ID" name="department_id" value={employeedata?.department_id} size="md" onChange={(e)=>setEmployeedata({...employeedata,[e.target.name]:e.target.value})} />
            <Input type="number" label="Gym_ID" name="project_id" size="md" value={employeedata?.project_id} onChange={(e)=>setEmployeedata({...employeedata,[e.target.name]:e.target.value})}/>
            <Button type="submit" onClick={handleEmployee}>Add Membership</Button>
        </div>
    )
}
export default AddMembership;