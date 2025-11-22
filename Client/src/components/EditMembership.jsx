import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const EditEmployee=({handleedit,data})=>{
    const [employeedata,setEmployeedata]=useState({first_name:data?.first_name,last_name:data?.last_name,email:data?.email,salary:data?.salary,department_id:data?.department_id,project_id:data?.project_id});
    const handleEditEmployee=async(e)=>{
        e.preventDefault();
        const password=prompt("Enter hr password");
        if(password!='nanna143'){
          handleedit(null);
          toast.error("Invalid hr password");
          return;
        }
        try {
            // Send the updated employee data to the server
            const result = await axios.put(
              'http://localhost:4173/api/updateemployee/' + data?.employee_id,
              employeedata
            );
            // Success message on successful update
            toast.success(result?.data || "Employee updated successfully!");
            // Close the dialog after a successful update
            handleedit(null);
          } catch (error) {
            // Error handling with toast message
            toast.error("Failed to update employee");
            console.error("Error updating employee: ", error);
          }
    }
  
    return(
        <div className="bg-white flex flex-col gap-4 p-10 rounded-md">
            
            <Input type="text" label="first_name" value={employeedata?.first_name} name="first_name" size="md" onChange={(e)=>setEmployeedata({...employeedata,[e.target.name]:e.target.value})}/>
            <Input type="text" label="last_name" value={employeedata?.last_name} name="last_name" size="md" onChange={(e)=>setEmployeedata({...employeedata,[e.target.name]:e.target.value})}/>
            <Input type="text" label="email" name="email" value={employeedata?.email} size="md" onChange={(e)=>setEmployeedata({...employeedata,[e.target.name]:e.target.value})}/>
            <Input type="number" label="salary" name="salary" size="md" value={employeedata?.salary} onChange={(e)=>setEmployeedata({...employeedata,[e.target.name]:e.target.value})} />
            <Input type="number" label="department_id" name="department_id" value={employeedata?.department_id} size="md" onChange={(e)=>setEmployeedata({...employeedata,[e.target.name]:e.target.value})} />
            <Input type="number" label="project_id" name="project_id" size="md" value={employeedata?.project_id} onChange={(e)=>setEmployeedata({...employeedata,[e.target.name]:e.target.value})}/>
            <Button type="submit" onClick={handleEditEmployee}>Edit Employee</Button>
        </div>
    )
}
export default EditEmployee;