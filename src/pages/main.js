import React, { useEffect, useState } from "react";
import TicTacToegrid from "../components/Tic-Tac-Toe-grid";
import { Loader } from "../components/loader";

export default function Main(props) {
  const [isFirst, setIsFirst] = useState(true);
  const [move, setMove] = useState();
  const [isOpponentReady, setIsOpponentReady] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [canChoose, setCanChoose] = useState(false);

  useEffect(() => {
    props.socket.emit("isFirst");
    console.log("Check started if we are first ");
    // checkIfOpponentHasJoined
  }, []);

  useEffect(() => {
    props.socket.on("isFirst", (response) => {
      console.log("reseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      setIsFirst(response);
      setIsOpponentReady(!response);
      if (!response) {
        // if we are not first , tell everyone we are ready
        props.socket.emit("opponentReadyStatus", {
          boolean: true,
          room: props.Room,
        });
        console.log("emitted");
      } else {
        // we are first we can choose our sign
        setCanChoose(true);
      }
    });

    props.socket.on("opponentReadyStatus", (response) => {
      console.log("response");
      setIsOpponentReady(response);
    });

    props.socket.on("setUserMove", (response) => {
      console.log(response);
      setMove(response.move);
    });
  }, [props.socket]);

  useEffect(() => {
    console.log(isOpponentReady, "isOpponentReady");
    if (isOpponentReady) {
      setShowGrid(true);
    }
  }, [isOpponentReady]);

  console.log(isOpponentReady, "isOpponentReady");
  console.log(showGrid, "showGrid");
  console.log(canChoose, "canChoose");
  return (
    <div>
      {!isOpponentReady &&
      ((isOpponentReady && !canChoose) || (!isOpponentReady && canChoose)) ? (
        <>
          <h1>Waiting for opponent to join</h1>{" "}
          <Loader typee={"BarLoader"} size={5} />
        </>
      ) : (
        !move && !canChoose && <h1>Waiting for opponent to choose Move</h1>
      )}
      <div>
        {isOpponentReady && canChoose && (
          <div
            className="text-center"
            onClick={(e) => {
              if (e.target.value) {
                console.log("line 164 setting useMove", e.target.value);

                console.log(e.target.value);
                props.socket.emit("setUserMove", {
                  value: e.target.value,
                  Room: props.Room,
                });
                setCanChoose(false);
              }
            }}
          >
            <h1>Choose your Move</h1>
            <button value="X" className="btn btn-outline-primary mx-4">
              X
            </button>
            <button value="O" className="btn btn-outline-danger mx-2">
              O
            </button>
          </div>
        )}
        {isOpponentReady && !canChoose && showGrid && (
          <TicTacToegrid socket={props.socket} Room={props.Room} />
        )}
      </div>
    </div>
  );

  //     <div>
  //       {(isOpponentReady && showGrid && !canChoose) ||
  //       (!isOpponentReady && !showGrid && canChoose) ? (
  //         <h1>Waiting for opponent to join</h1>
  //       ) : null}

  //       <br />
  //       <br />

  //       {isOpponentReady && canChoose && (
  //         <div
  //           className="text-center"
  //           onClick={(e) => {
  //             if (e.target.value) {
  //               console.log("line 164 setting useMove", e.target.value);

  //               console.log(e.target.value);
  //               props.socket.emit("setUserMove", {
  //                 value: e.target.value,
  //                 Room: props.Room,
  //               });
  //               setCanChoose(false);
  //             }
  //           }}
  //         >
  //           <h1>Choose your Move</h1>
  //           <button value="X" className="btn btn-outline-primary mx-4">
  //             X
  //           </button>
  //           <button value="O" className="btn btn-outline-danger mx-2">
  //             O
  //           </button>
  //         </div>
  //       )}

  //       {showGrid && <TicTacToegrid socket={props.socket} Room={props.Room} />}
  //     </div>
  //   );
}
