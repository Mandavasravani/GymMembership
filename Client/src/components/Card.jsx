import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
    Dialog,
  } from "@material-tailwind/react";
import ProjectEmployees from "./GymMemberships";
import { useState } from "react";
   
  export function BlogCard({data}) {
    const [project,setProject] = useState('');
    const handleProjectOpen=(data)=>{
      setProject(data);
    }
    const formatedDate=(date)=>{
      const createdDate = new Date(date);
      const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      };
  
      const formattedDate = createdDate.toLocaleDateString('en-US', options);
      return formattedDate;
  }
    return (
      <Card className="max-w-[24rem] overflow-hidden">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="ui/ux review check"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h4" color="blue-gray">
            {data?.project_name}
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal">
          Project ID: {data?.project_id}
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal">
          Start date: {formatedDate(data?.start_date)}
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal">
          End date: {formatedDate(data?.end_date)}
          </Typography>
        </CardBody>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center -space-x-3">
            <Tooltip content="Natali Craig">
              <Avatar
                size="sm"
                variant="circular"
                alt="natali craig"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                className="border-2 border-white hover:z-10"
              />
            </Tooltip>
            <Tooltip content="Tania Andrew">
              <Avatar
                size="sm"
                variant="circular"
                alt="tania andrew"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                className="border-2 border-white hover:z-10"
              />
            </Tooltip>
          </div>
          <Typography className="font-normal cursor-pointer" onClick={()=>handleProjectOpen(data?.project_id)}>See Employees</Typography>
        </CardFooter>
          <Dialog
        size="xs"
        open={project}
        handler={handleProjectOpen}
        className="bg-transparent shadow-none"
      >
        <ProjectEmployees handledataopen={handleProjectOpen} project={project} />
      </Dialog>
      </Card>
    );
  }