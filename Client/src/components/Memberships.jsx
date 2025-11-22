import { CiSearch } from "react-icons/ci";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import AddEmployee from "./AddMembership";
import EditEmployee from "./EditMembership";
import { toast } from "react-toastify";
 
const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monthly",
    value: "engineering",
  },
  {
    label: "Yearly",
    value: "marketing",
  },
];
 
const TABLE_HEAD = ["Employee","Employee_Id","Department_id","Project_id","Salary", "Edit", "Remove"];


 
export function EmployeeMembersTable() {
  const[employees,setEmployees]=useState([]);
  const[edititem,setEdititem]=useState(null);
  const[open,setOpen]=useState(false);
  const [search,setSearch]=useState(0);
  const handleEditOpen=(item)=>{
    setEdititem(item);
  }
  const handleOpen = ()=>{
    setOpen((cur) => !cur);
  }
  const handleDeleteEmployee=async(id)=>{
    try{
      const password=prompt("Enter hr password");
      if(password!='nanna143'){
        toast.error("Invalid hr password");
        return;
      }
      
      const result=await axios.delete('http://localhost:4173/api/deleteemployee/' + id);
      toast.success(result?.data);
      window.location.reload();
    }catch(err){
      toast.error("Failed to delete employee");
      console.log(err);
    }
  }
  useEffect(()=>{
    const fetchData=async()=>{
      await fetch('http://localhost:4173/api/allemployees',{
        method:'GET',
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(response=>response.json()).then((data)=>setEmployees(data)).catch(error=>console.log(error));
    }
    fetchData();
  },[])
  const filterEmployees=employees?.filter((item)=>{
    if(search){
      return item.employee_id.toString().includes(search);
    }
    return true;
  });
  
 
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              All Memberships list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all memberships
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button onClick={handleOpen} className="flex items-center gap-3" size="sm">
              <MdEdit  className="h-4 w-4" /> Add Membership
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              type="number"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              label="Search by membershipID"
              icon={<CiSearch className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
            {filterEmployees.map(
              (item, index) => {
                const isLast = index === employees?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={item.employee_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg" alt={item?.employee_id} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item?.first_name} {item?.last_name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {item?.email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.employee_id}
                        </Typography>
                        
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.department_id}
                        </Typography>
                        
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.project_id}
                        </Typography>
                        
                      </div>
                    </td>
                   
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        ${item?.salary}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton onClick={()=>handleEditOpen(item)} variant="text">
                          <MdEdit className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton onClick={()=>handleDeleteEmployee(item?.employee_id)} variant="text">
                          <MdDelete className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                    
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
              <AddEmployee value={handleOpen}/>
      </Dialog>
      <Dialog
        size="xs"
        open={edititem}
        handler={handleEditOpen}
        className="bg-transparent shadow-none"
      >
        <EditEmployee handleedit={handleEditOpen} data={edititem} />
      </Dialog>
            
    </Card>
  );
}