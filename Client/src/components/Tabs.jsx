import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import Projects from "./Gyms";
import { EmployeeMembersTable } from "./Memberships";
import { TimeEntries } from "./TimeEntries";
   
  export function TabsDefault() {
    const data = [
      {
        label: "Gyms",
        value: "projects",
      },
      {
        label: "Memberships",
        value: "employees",
        
      },
      {
        label: "Time Entries",
        value: "time_entries",
       
      },
      {
        label: "Admins",
        value: "hr",
   
      },
      
    ];
   
    return (
        <div className="my-5 md:my-10">
            <Tabs value="projects">
                <TabsHeader className="mx-4">
                {data.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                    {label}
                    </Tab>
                ))}
                </TabsHeader>
                <TabsBody>
                {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                    <div>
                        {value === "projects"? <Projects /> : null}
                        {value === "employees"? <EmployeeMembersTable /> : null}
                        {value === "time_entries"? <TimeEntries /> : null}
                        {/* {value === "hr"? <HR /> : null} */}
                        
                        
                    </div>
                    </TabPanel>
                ))}
                </TabsBody>
            </Tabs>
            
        </div>
      
    );
  }