import React, { useState, useEffect } from "react";
import axios from "axios";
import RoomForm from "./RoomForm";
import { ActionCableConsumer } from "react-actioncable-provider";

// componentDidMount = () => {
//   fetch(`${API_ROOT}/conversations`)
//     .then(res => res.json())
//     .then(conversations => this.setState({ conversations }));
// };

function RoomsList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get("/rooms")
      .then((res) => {
        // res.data = [{id,name, messages:[]}]
        setRooms(res.data);
      })
      .catch((e) => {
        debugger;
      });
  }, []);

  function handleRoomClicked(id) {
    console.log(id);
  }

  function renderRooms() {
    return rooms.map((room) => (
      <div key={`room-${room.id}`} onClick={() => handleRoomClicked(room.id)}>
        <h3>{room.name}</h3>
      </div>
    ));
  }
  function handleRoomReceived(res) {
    setRooms([...rooms, res.room]);
  }
  return (
    <div>
      <ActionCableConsumer
        channel={"RoomsChannel"}
        onReceived={handleRoomReceived}
      />
      <RoomForm />
      <h1>Rooms</h1>
      {renderRooms()}
    </div>
  );
}

export default RoomsList;
