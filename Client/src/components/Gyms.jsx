import { useEffect, useState } from "react";
import { BlogCard } from "./Card";
import axios from "axios";
const Projects=()=>{
    const [projects,setProjects]=useState([]);
    useEffect(()=>{
        const fetchAllProjects=async()=>{
            const result=await axios.get('http://localhost:4173/api/projects');
            setProjects(result.data);
        }
        fetchAllProjects();
    },[])
    return(
        <div className="m-5">
            <div className="grid grid-cols-1 md:grid-cols-3 ">
                {projects?.map((project)=>(
                    <div key={project.project_id}>
                        <BlogCard data={project}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Projects;