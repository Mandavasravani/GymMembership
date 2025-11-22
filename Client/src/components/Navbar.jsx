import { Input } from "@material-tailwind/react";

function Navbar(){
    return(
        <div className="flex  flex-col md:flex-row md:justify-between bg-blue-gray-200 p-4 gap-10 md:gap-0">
            <div>
                <h1 className="font-bold text-xl">Gym Membership</h1>
            </div>
            <div className="border-b-2 ">
            <Input label="Search Membership"
                        type="text"
                        size="md"
                        name="MembershipSearch"
                        className="flex-grow" />
            </div>
            
        </div>
    )
}
export default Navbar;