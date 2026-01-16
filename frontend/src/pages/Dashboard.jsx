import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/leads")
      .then(res => setLeads(res.data.leads));
  }, []);

  return (
    <div>
      <h2>Leads Dashboard</h2>
      {leads.map(lead => (
        <div key={lead._id}>
          {lead.name} - {lead.status}
        </div>
      ))}
    </div>
  );
}
