import React, { useEffect, useState } from "react";
import ChatUI from "../components/chatUI";
import TicTacToegrid from "../components/Tic-Tac-Toe-grid";
import { Loader } from "../components/loader";

export default function Main(props) {
  //   console.log(props);
  let trial;
  useEffect(() => {
    props.socket.emit("isFirst");
  }, []);
  const [Messages, setMessages] = useState([
    { id: 1, text: "Hello there!", isUser: true },
    { id: 2, text: "Hi! How can I help you?", isUser: false },
  ]);

  const [move, setMove] = useState("");
  const [secret, setSecret] = useState("");
  const [userMove, setUserMove] = useState();
  const [canChoose, setCanChoose] = useState(true);
  const [disableAll, setDisableAll] = useState(false);
  const [secondPersonJoined, setSecondPersonJoined] = useState(false);
  const [isfirst, setIsFirst] = useState();

  const handleBtn = (input) => {
    const MsgData = {
      Msg: input,
      Room: props.Room,
      randomlyCreated: props.randomlyCreated,
      id: props.Room,
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), text: input, isUser: true },
    ]);

    props.socket.emit("Msg", MsgData);
  };

  const handleMove = (input) => {
    const inputData = {
      input,
      Room: props.Room,
    };
    props.socket.emit("Move", inputData);
    setDisableAll(true);
  };

  useEffect(() => {
    props.socket.on("Move", (move) => {
      console.log("Played Move", move); //opponents move is received here!
      setDisableAll(false);
      setMove(move);
      //   setCurrentMove(move)
    });

    props.socket.on("getMove", (move) => {
      console.log("request received for move.......%%%");
      console.log(userMove);
      console.log(secret);
      const currentUserMove = userMove;
      console.log(currentUserMove);

      console.log(move);
      console.log(trial);

      if (trial) {
        if (trial === "X") {
          trial = "O";
        } else trial = "X";
        props.socket.emit("sendingMove", { value: trial, Room: move.room });
        console.log("move sentttttttttttttt", trial);
      }
    });

    props.socket.on("sendingMove", (move) => {
      console.log(move.value, "Move receivedddddd");
      console.log("line 78 setting userMove", move.value);
      setUserMove(move.value);
    });

    props.socket.on("Msg", (Msg) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: Msg, isUser: false },
      ]);
    });

    props.socket.on("setUserMove", (move) => {
      console.log("line 91 setting useMove", move.value);

      setUserMove(move.value);
    });

    props.socket.on("SecondPlayerJoined", (boolean) => {
      setSecondPersonJoined(true);
    });
  }, [props.socket]);

  if (canChoose) {
    props.socket.on("isfirst", (isAlone) => {
      setIsFirst(isAlone);
      if (isAlone) {
        console.log("You are the only player in the room.");

        setCanChoose(true);
      } else {
        console.log("There are other players in the room.");
        console.log(userMove);
        setCanChoose(false);

        setSecondPersonJoined(true);
        props.socket.emit("SecondPlayerJoined", {
          boolean: true,
          room: props.Room,
        });

        console.log("Asking for move.......................");
        props.socket.emit("getMove", {
          room: props.Room,
          msg: "sent line 110 : im alone",
        });
      }
    });
  }

  //   useEffect(() => {
  //     console.log("Updated userMove:", userMove);

  //     if (!userMove) {
  //       console.log("line 82");
  //       props.socket.emit("getMove", { room: props.Room });
  //     }
  //   }, []);  commented to test getting move after confirming that we are second joinee

  useEffect(() => {
    if (!(canChoose || userMove)) {
      setDisableAll(true);
    } else {
      setDisableAll(false);
    }
  }, [canChoose, userMove]);

  console.log("secondPersonJoined", secondPersonJoined);
  console.log("canChoose", canChoose);
  console.log("userMove", userMove);

  function setSecretFn(value) {
    setSecret(value);
  }
  return (
    <div className="container  ">
      {secondPersonJoined && (canChoose || userMove) ? (
        <h1>{userMove}</h1>
      ) : (
        <h1 className="items-center">
          Waiting for other player to choose move
          <Loader type={"BarLoader"} size={20} />
        </h1>
      )}

      <div>
        {canChoose ? (
          <div
            className="text-center"
            onClick={(e) => {
              if (e.target.value) {
                console.log("line 164 setting useMove", e.target.value);
                setSecretFn(e.target.value);
                setUserMove(e.target.value);
                trial = e.target.value;
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
        ) : (
          <TicTacToegrid
            userMove={userMove}
            handleMove={handleMove}
            move={move}
            disableAll={disableAll}
          />
        )}

        {/* <ChatUI Messages={Messages} handleBtn={handleBtn} /> */}
      </div>
    </div>
  );
}
