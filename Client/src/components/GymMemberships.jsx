import { Button, Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
const TABLE_HEAD = ["Membership_ID", "FirstName", "LastName", "Email"];
 

export default function ProjectEmployees({handledataopen,project}) {
    const [data,setData]=useState([]);
    useEffect(()=>{
        const fetchProjectEmployees=async()=>{
            const results=await axios.get(`http://localhost:4173/api/employees/${project}`)
            console.log(results);
            setData(results.data);
        }
        fetchProjectEmployees();
    },[project])
  return (
    <Card className="h-full w-full overflow-scroll p-5">
      <table className="w-full table-auto text-left ">
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
          {data?.map(({ employee_id,first_name, last_name,email }, index) => {
            const isLast = index === data.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={index}>
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
                    {first_name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {last_name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {email}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
        {!data.length && <div className="flex justify-center"> <h1 className="my-10 font-bold">No Data</h1>
            </div>}
      </table>
      
    </Card>
  );
}