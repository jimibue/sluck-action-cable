import React, { useState } from "react";
import Axios from "axios";

export default function RoomForm(props) {
  const [name, setName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await Axios.post("/rooms", { name });
    setName("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Room Name:</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">add</button>
      </form>
    </div>
  );
}
