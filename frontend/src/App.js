import React, { useState } from "react";
import axios from "axios";

function App() {

  const [ticketId, setTicketId] = useState("");
  const [vmName, setVmName] = useState("");
  const [description, setDescription] = useState("");
  

  const [result, setResult] = useState(null);

  const raiseTicket = async () => {

    const payload = {
      ticket_id: ticketId,
      vm_name: vmName,
      description: description
    };

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/create-backup",
        payload
      );

      setResult(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  return (

    <div style={{
      padding: "40px",
      fontFamily: "Arial",
      backgroundColor: "#f4f6f8",
      minHeight: "100vh"
    }}>

      <h1>AI Cloud Backup Agent</h1>

      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "400px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>

        <h2>Raise ITSM Ticket</h2>

        <input
          type="text"
          placeholder="Ticket ID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <input
          type="text"
          placeholder="VM Name"
          value={vmName}
          onChange={(e) => setVmName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <textarea
          placeholder="Describe the issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            height: "100px"
          }}
        />

        <button
          onClick={raiseTicket}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0078D4",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px"
          }}
        >
          Raise Ticket & Trigger Backup
        </button>

      </div>

      {result && (

        <div style={{
          marginTop: "30px",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "500px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}>

          <h2>Backup Result</h2>

          <p>
            <strong>Ticket ID:</strong>
            {" "}
            {result.ticket_id}
          </p>

          <p>
            <strong>VM Name:</strong>
            {" "}
            {result.agent_result.vm_name}
          </p>

          <p>
            <strong>Snapshot:</strong>
            {" "}
            {result.agent_result.snapshot_name}
          </p>

          <p>
            <strong>Status:</strong>
            {" "}
            {result.agent_result.status}
          </p>

          <p>
            <strong>Timestamp:</strong>
            {" "}
            {result.agent_result.timestamp}
          </p>

          <p>
            <strong>Detected Action:</strong>
            {" "}
            {result.agent_result.action}
          </p>

        </div>
      )}

    </div>
  );
}

export default App;