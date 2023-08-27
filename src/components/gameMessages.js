export const VictoryMessages = () => {
  const victoryMessages = [
    "You Won, Clever Moves!",
    "Victory is Yours, Well Played!",
    "A Winning Move, Congratulations!",
    "You're the Champion, Great Job!",
    "A Masterful Victory!",
    "The Sweet Taste of Success!",
    "You've Conquered the Board!",
    "A Triumph of Strategy!",
    "An Unbeatable Performance!",
    "Incredible Play, Victory Achieved!",
  ];

  return victoryMessages[Math.floor(Math.random() * victoryMessages.length)];
};
export const DrawMessages = () => {
  const drawMessages = [
    "It's a Draw! Well Played",
    "Neither Wins, It's a Draw!",
    "A Battle of Equals, It's a Draw!",
    "Stalemate! The Game Ends in a Draw",
    "No Clear Victor, It's a Draw!",
    "Both Players Showed Skill, It's a Draw!",
    "A Contest without a Winner, It's a Draw!",
    "The Board Agrees, It's a Draw!",
    "A Gentleman's Draw, Well Played!",
    "No Winners Today, It's a Draw!",
    "A Tied Game, Great Effort!",
    "An Impasse, It's a Draw!",
    "No Defeat, No Victory, It's a Draw!",
    "The Game is Balanced, It's a Draw!",
    "A Harmonious End, It's a Draw!",
    "Two Titans Clash, It's a Draw!",
    "A Diplomatic Resolution, It's a Draw!",
    "Equal Mastery on Display, It's a Draw!",
    "An Art of Balance, It's a Draw!",
    "An Unpredictable Outcome, It's a Draw!",
  ];

  return drawMessages[Math.floor(Math.random() * drawMessages.length)];
};

export const LossMessages = () => {
  const lossMessages = [
    "You Lost this Time, Keep Trying!",
    "Better Luck Next Round!",
    "A Tough Battle, But Not Your Day!",
    "Defeat Today, Victory Tomorrow!",
    "Outplayed This Time, Come Back Stronger!",
    "A Learning Experience, Keep Improving!",
    "Loss Teaches More Than Victory, Keep Pushing!",
    "Accept Defeat with Grace, Rise Again!",
    "A Worthy Opponent Prevailed, Respect!",
    "The Board Tips in Your Opponent's Favor!",
    "A Momentary Setback, Keep Playing!",
    "Loss is Temporary, Determination is Permanent!",
    "Reflect, Adapt, and Overcome Next Time!",
    "One Game Lost, Many More to Win!",
    "Don't Let Defeat Define You, Keep Playing!",
    "Remember, Even Legends Face Defeats!",
    "A Loss Today, Fuel for Future Wins!",
    "Take the Loss in Stride, Aim for the Win!",
    "Loss is Not the End, Keep Competing!",
    "Losing Today, Gearing Up for Victory Tomorrow!",
  ];

  return lossMessages[Math.floor(Math.random() * lossMessages.length)];
};
