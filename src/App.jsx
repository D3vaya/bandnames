import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";
import { BandAdd } from "./components/BandAdd";
import { BandList } from "./components/BandList";

const connectSocketServer = () => {
  const socket = io.connect("http://localhost:8080", {
    transport: ["websocket"],
  });
  return socket;
};

function App() {
  const [socket, setSocket] = useState(connectSocketServer());
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });
  }, [socket]);

  const vote = (id) => {
    socket.emit("vote-band", { id });
  };

  const voteCB = useCallback(vote, []);

  const removeBand = (id) => {
    socket.emit("remove-band", { id });
  };

  const removeBandCB = useCallback(removeBand, []);

  const changeName = (id, newName) => {
    socket.emit("change-name", { id, name: newName });
  };

  const changeNameCB = useCallback(changeName, []);

  const createBand = (name) => {
    socket.emit("create-band", { name });
  };

  const createBandCB = useCallback(createBand, []);

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </p>
        <h1>Band Names</h1>
        <hr />
        <div className="row">
          <div className="col-8">
            <BandList
              data={bands}
              vote={voteCB}
              remove={removeBandCB}
              changeName={changeNameCB}
            />
          </div>
          <div className="col-4">
            <BandAdd createBand={createBandCB} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
