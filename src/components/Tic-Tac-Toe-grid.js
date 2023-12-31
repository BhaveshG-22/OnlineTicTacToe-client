import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VictoryMessages, LossMessages, DrawMessages } from "./gameMessages";
import "../components/ChatUI.css";
import { Toaster } from "react-hot-toast";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TicTacToegrid = (props) => {
  const navigate = useNavigate();
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [Move, setMove] = useState();

  const [gameGrid, setgameGrid] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  useEffect(() => {
    if (!props.userMove) {
      navigate("/");
    }
  }, []);

  // useEffect(() => {
  //   const result = checkWin(gameGrid);
  //   if (result) {
  //     const { sequence, winner } = result;
  //     console.log("Someone Woooooooon!");
  //     console.log("Winning Sequence:", sequence);
  //     console.log("Winner:", winner);
  //     setButtonsDisabled(true);
  //   }
  // }, [gameGrid]);

  useEffect(() => {
    const result = checkWin(gameGrid);
    if (result) {
      const { sequence, winner, draw } = result;
      console.log("Someone Woooooooon!");
      console.log("Winning Sequence:", sequence);
      console.log("Winner:", winner);

      // Show toast notification when someone wins

      // toast.success(`${winner} ${Move} won the game!`, {
      //   duration: 5000,
      // });

      if (Move == winner) {
        toast.success(VictoryMessages, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (draw) {
        toast.info(DrawMessages, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(LossMessages, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      if (winner || draw) {
        setTimeout(() => {
          toast.loading("Redirecting to Home , Game Ended", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setTimeout(() => {
            console.log("Navigating to home");
            navigate("/home");
          }, 3000);
        }, 8000);
      }

      setButtonsDisabled(true);
    }
  }, [gameGrid]);

  function checkWin(grid) {
    const winningSequences = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const sequence of winningSequences) {
      const [a, b, c] = sequence;
      if (grid[a] && grid[a] === grid[b] && grid[b] === grid[c]) {
        return { sequence, winner: grid[a] };
      }
    }

    // Check for a draw
    if (!grid.includes(null)) {
      return { draw: true };
    }

    return null; // No winner
  }

  console.log(gameGrid);

  const handelClick = (e) => {
    if (e.target.id && !buttonsDisabled) {
      const input = e.target.id;
      const box = document.getElementById(e.target.id);
      box.innerText = Move;
      box.disabled = true;

      // const newGrid = [...gameGrid];
      // newGrid[e.target.id.replace("box", "") - 1] = Move;
      // setgameGrid(newGrid);
      // // console.log(newGrid);

      setgameGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[input.replace("box", "") - 1] = Move;
        return newGrid;
      });

      props.socket.emit("sendMove", {
        input: e.target.id.replace("box", "") - 1,
        Room: props.Room,
        move: Move,
      });

      // handleMove(input);
      setButtonsDisabled(true);
    }
  };

  useEffect(() => {
    props.socket.on("setUserMove", (response) => {
      console.log("My sign is ", response);
      setMove(response.move);
      !response.isFirst && setButtonsDisabled(true);
    });

    props.socket.on("receiveMove", (response) => {
      setButtonsDisabled(false);

      //move.input && move.Move
      console.log(response);

      // const newGrid = [...gameGrid];
      // newGrid[response.input] = response.move;
      // setgameGrid(newGrid);

      setgameGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[response.input] = response.move;
        return newGrid;
      });

      let id = "box" + (response.input + 1);
      console.log(id);
      const box = document.getElementById(id);
      box.innerText = response.move;
      box.disabled = true;
    });
  }, [props.socket]);

  // function handleMove() {
  //   // write logic to handel move
  // }
  const notify = () => toast("Here is your toast.");
  return (
    Move && (
      <div>
        <div
          id="game"
          onClick={(e) => {
            handelClick(e);
          }}
        >
          <button className="box" id="box1"></button>
          <button className="box" id="box2"></button>
          <button className="box" id="box3"></button>
          <button className="box" id="box4"></button>
          <button className="box" id="box5"></button>
          <button className="box" id="box6"></button>
          <button className="box" id="box7"></button>
          <button className="box" id="box8"></button>
          <button className="box" id="box9"></button>
        </div>
        <Toaster position="top-right" />
        <ToastContainer />
        {/* <div>
          <button onClick={notify}>Make me a toast</button>  
        <Toaster />  
          </div> */}
      </div>
    )
  );
};

export default TicTacToegrid;

// import React, { useEffect, useState } from "react";
// import "../components/ChatUI.css";
// import { useNavigate } from "react-router-dom";

// const TicTacToegrid = (props) => {
//   const navigate = useNavigate();
//   const [buttonsDisabled, setButtonsDisabled] = useState(false);
//   const [Move, setMove] = useState();

//   const [gameGrid, setgameGrid] = useState([
//     null,
//     null,
//     null,
//     null,
//     null,
//     null,
//     null,
//     null,
//     null,
//   ]);

//   useEffect(() => {
//     if (!props.userMove) {
//       navigate("/");
//     }
//   }, []);

//   useEffect(() => {
//     const result = checkWin(gameGrid);
//     if (result) {
//       const { sequence, winner } = result;
//       console.log("Someone Woooooooon!");
//       console.log("Winning Sequence:", sequence);
//       console.log("Winner:", winner);
//       setButtonsDisabled(true);
//     }
//   }, [gameGrid]);

//   function checkWin(grid) {
//     const winningSequences = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8], // Rows
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8], // Columns
//       [0, 4, 8],
//       [2, 4, 6], // Diagonals
//     ];

//     for (const sequence of winningSequences) {
//       const [a, b, c] = sequence;
//       if (grid[a] && grid[a] === grid[b] && grid[b] === grid[c]) {
//         return { sequence, winner: grid[a] };
//       }
//     }

//     return null; // No winner
//   }

//   console.log(gameGrid);

//   const handelClick = (e) => {
//     if (e.target.id && !buttonsDisabled) {
//       const input = e.target.id;
//       const box = document.getElementById(e.target.id);
//       box.innerText = Move;

//       // const newGrid = [...gameGrid];
//       // newGrid[e.target.id.replace("box", "") - 1] = Move;
//       // setgameGrid(newGrid);
//       // // console.log(newGrid);

//       setgameGrid((prevGrid) => {
//         const newGrid = [...prevGrid];
//         newGrid[input.replace("box", "") - 1] = Move;
//         return newGrid;
//       });

//       props.socket.emit("sendMove", {
//         input: e.target.id.replace("box", "") - 1,
//         Room: props.Room,
//         move: Move,
//       });

//       // handleMove(input);
//       setButtonsDisabled(true);
//     }
//   };

//   useEffect(() => {
//     props.socket.on("setUserMove", (response) => {
//       console.log("My sign is ", response);
//       setMove(response.move);
//       !response.isFirst && setButtonsDisabled(true);
//     });

//     props.socket.on("receiveMove", (response) => {
//       setButtonsDisabled(false);

//       //move.input && move.Move
//       console.log(response);

//       // const newGrid = [...gameGrid];
//       // newGrid[response.input] = response.move;
//       // setgameGrid(newGrid);

//       setgameGrid((prevGrid) => {
//         const newGrid = [...prevGrid];
//         newGrid[response.input] = response.move;
//         return newGrid;
//       });

//       let id = "box" + (response.input + 1);
//       console.log(id);
//       const box = document.getElementById(id);
//       box.innerText = response.move;
//     });
//   }, [props.socket]);

//   // function handleMove() {
//   //   // write logic to handel move
//   // }

//   return (
//     Move && (
//       <div>
//         <div
//           id="game"
//           onClick={(e) => {
//             handelClick(e);
//           }}
//         >
//           <button className="box" id="box1"></button>
//           <button className="box" id="box2"></button>
//           <button className="box" id="box3"></button>
//           <button className="box" id="box4"></button>
//           <button className="box" id="box5"></button>
//           <button className="box" id="box6"></button>
//           <button className="box" id="box7"></button>
//           <button className="box" id="box8"></button>
//           <button className="box" id="box9"></button>
//         </div>
//         <Toaster position="top-right" />
//       </div>
//     )
//   );
// };

// export default TicTacToegrid;
