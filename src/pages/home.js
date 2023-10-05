import React, { useEffect, useState } from "react";
import cryptoRandomString from "crypto-random-string";
import { Loader } from "../components/loader";
import GeneratedIDMessage from "../components/IDviewer";
import Main from "./main";
import { io } from "socket.io-client";

// const socket = io.connect("https://onlinetictactoe-server.onrender.com/");
// const socket = io.connect("https://trial1.adaptable.app/");
const socket = io.connect(
  "https://vercel.com/bhaveshg-22/online-tic-tac-toe-server"
);

export const Home = () => {
  const [showMain, setShowMain] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [chatId, setChatId] = useState("");
  const [inputId, setInputId] = useState("");

  const [showGeneratedID, setShowGeneratedID] = useState(false);
  const [generatedID, setGeneratedID] = useState("");

  const handleGeneratedIDConfirm = () => {
    setShowGeneratedID(false);
    setShowLoader(true);

    // setTimeout(async () => {
    const RoomData = {
      id: generatedID,
    };
    socket.emit("SetRoom", RoomData);
    setShowLoader(false);
    setChatId(generatedID);
    setShowMain(true);
    // }, 0);
  };

  const handelStartChat = () => {
    const RandomChatId = cryptoRandomString({
      length: 10,
      type: "alphanumeric",
    });

    setGeneratedID(RandomChatId);
    setShowGeneratedID(true);
  };

  useEffect(() => {
    socket.on("InvalidRoom", (Msg) => {
      setShowMain(false);
      alert(Msg.Msg);
      console.log(Msg.Msg);
    });
    socket.on("CannotJoin", (Msg) => {
      console.log(Msg);
      setShowMain(false);
    });
  }, []);

  // return (
  //   <div className="container mt-5">
  //     <div className="row justify-content-center">
  //       <div className="col-md-6">
  //         <div className="card p-3">
  //           <label htmlFor="IdInput" className="form-label">
  //             Enter Chat ID:
  //           </label>
  //           <input
  //             type="text"
  //             className="form-control mb-3"
  //             onChange={(e) => setInputId(e.target.value)}
  //           />
  //           <button
  //             className="btn btn-primary mb-3"
  //             onClick={() => {
  //               setTimeout(async () => {
  //                 await socket.emit("SetRoom", {
  //                   id: inputId,
  //                 });
  //                 setChatId(inputId);
  //                 setShowMain(true);
  //               }, 1000);
  //             }}
  //           >
  //             Join
  //           </button>
  //           <div className="text-center mb-3">OR</div>
  //           <button
  //             onClick={handelStartChat}
  //             className="btn btn-secondary"
  //             style={{ width: "100%" }}
  //           >
  //             Start New Game!
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //     {showGeneratedID && (
  //       <GeneratedIDMessage
  //         id={generatedID}
  //         onConfirm={handleGeneratedIDConfirm}
  //       />
  //     )}
  //   </div>
  // );

  return (
    <div className="container  mt-3">
      <div className="row justify-content-center ">
        <div className="col-md-6 card">
          <div className=" p-4">
            {showMain ? ( // Show Main component if showMain is true
              <Main Room={chatId} socket={socket} />
            ) : (
              <div>
                {/* <label htmlFor="IdInput" className="form-label">
                  Enter Chat ID:
                </label> */}
                {/* <input
                  type="text"
                  className="form-control mb-3"
                  onChange={(e) => setInputId(e.target.value)}
                /> */}
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Chat ID"
                    value={inputId}
                    onChange={(e) => setInputId(e.target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      navigator.clipboard.readText().then((text) => {
                        setInputId(text);
                      });
                    }}
                  >
                    Paste
                  </button>
                </div>

                <button
                  className="btn btn-primary mb-3 d-block w-100"
                  onClick={() => {
                    setTimeout(async () => {
                      await socket.emit("SetRoom", {
                        id: inputId,
                      });
                      setChatId(inputId);
                      setShowMain(true);
                    }, 1000);
                  }}
                >
                  Join
                </button>
                <div className="text-center mb-3">OR</div>
                <button
                  onClick={handelStartChat}
                  className="btn btn-secondary"
                  style={{ width: "100%" }}
                >
                  Start New Game!
                </button>
              </div>
            )}
            {showGeneratedID && (
              <GeneratedIDMessage
                id={generatedID}
                onConfirm={handleGeneratedIDConfirm}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
