import { Button, Card, Dialog, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import CheckInOutForm from "./CheckInOutForm";
import axios from 'axios';
import { toast } from'react-toastify';
const TABLE_HEAD = ["Employee_id", "Project_id", "StartTime", "EndTime","HoursWorked"];
const TABLE_ROWS = [
  {
    employee_id:'1',
    project_id:'1',
    start_time:'10:00',
    end_time:'11:30',
    hours_worked:'1.5',
  },
  
];
 
export function TimeEntries() {
    const [open, setOpen]=useState(false);
    const handleOpen = ()=>{
        setOpen((cur)=>!cur);
    }
    const [timeEntries,setTimeEntries]=useState([]);
    const deleteTimeentries = async ()=>{
      try{
        const result=await axios.delete('http://localhost:4173/api/deleteTimeEntries');
        toast.success('delete all time entries');
        window.location.reload();
      }catch(err){
        console.error("Failed to delete time entries");
      }
    }
    useEffect(()=>{
      //fetch the time_entries
      const fetchTimeEntries = async ()=>{
        await fetch('http://localhost:4173/api/getTimeEntries',{
          method:'GET',
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(response=>response.json()).then(data=>setTimeEntries(data)).catch(error=>console.error(error));
      }
      fetchTimeEntries();
    },[])
  return (
    <Card className="h-full w-full overflow-scroll">
        <div className="my-5 gap-10 flex  items-center justify-end">
            <Button onClick={handleOpen}>Add Time Entry</Button>
            <Button onClick={deleteTimeentries}>Delete TimeEntries</Button>
        </div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeEntries.map(({entry_id,employee_id,project_id,start_time,end_time,hours_worked }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={entry_id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {employee_id}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {project_id}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {start_time}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {end_time}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {hours_worked}
                  </Typography>
                </td>
                
              </tr>
            );
          })}
        </tbody>
      </table>
      <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <CheckInOutForm value={handleOpen}/>
            </Dialog>
    </Card>
  );
}