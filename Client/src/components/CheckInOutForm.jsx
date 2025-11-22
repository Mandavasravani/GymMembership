import { useState } from "react";
import axios from "axios";
import { Input,Button } from "@material-tailwind/react";
import { toast } from'react-toastify';
export default function CheckInOutForm({value}) {
  // Initialize the state with current date and time for start_time and end_time
  const [data, setData] = useState({
    entry_id: 0,
    employee_id: "",
    project_id: "",
    start_time: new Date(),  // Automatically sets current date and time
    end_time: new Date(),    // You can later update this manually
  });

  // Function to format the date as 'YYYY-MM-DD HH:MM:SS'
  const formatDateTime = (date) => {
    return date.toISOString().slice(0, 19).replace("T", " ");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: new Date(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the start_time and end_time before sending to the server
    const payload = {
      ...data,
      start_time: formatDateTime(data.start_time),
      end_time: formatDateTime(data.end_time),
    };

    try {
      const response = await axios.post("http://localhost:4173/api/addTimeEntry", payload);
      console.log(response.data);
      value();
      toast.success("Time entry saved successfully!");

    } catch (error) {
      console.error("Error saving the time entry:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-10 flex flex-col gap-5">
       <Input
        type="text"
        label='entry_id'
        name="entry_id"
        value={data.entry_id}
        onChange={handleInputChange}
        placeholder="Entry ID"
      />
      <Input
        type="text"
        label='employee_id'
        name="employee_id"
        value={data.employee_id}
        onChange={handleInputChange}
        placeholder="Employee ID"
      />
      <Input
        type="text"
        label="Project_id"
        name="project_id"
        value={data.project_id}
        onChange={handleInputChange}
        placeholder="Project ID"
      />
      <Input
        type="datetime-local"
        label="start_time"
        name="start_time"
        value={data.start_time.toISOString().slice(0, 16)}
        onChange={handleDateChange}
      />
      <Input
        type="datetime-local"
        label="end_time"
        name="end_time"
        value={data.end_time.toISOString().slice(0, 16)}
        onChange={handleDateChange}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
