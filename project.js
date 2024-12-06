// 1. take Deposit from user
// 2. identify which slot the user bet on
// 3. collect a bet amount
// 4. spin the slot machine
// 5. identify if user won
// 6. give user its winnings
// 7. play again

const prompt = require("prompt-sync")();

 const ROWS = 3;
 const COLS = 3;

const SYMBOLS_COUNT = {
  "A" : 2,
  "B" : 4,
  "C" : 6,
  "D" : 8
};

const SYMBOLS_VALUE  = {
  "A" : 5,
  "B" : 4,
  "C" : 3,
  "D" : 2
}

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter the amount you want to deposit: ");
    const numberDepositAmount = parseFloat(depositAmount);
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid deposit amount, try again.");
    }
    else {
      return numberDepositAmount;
    }
  };
  }

const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the line you want to bet on (1-3): ");
    const numberOfLines = parseFloat(lines);
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("The following line is invalid to bet on, try again.");
    }
    else {
      return numberOfLines;
    }
  };
}

const getBetAmount = (balance, numberOfLines) => {
  while (true) {
    const bet = prompt("Enter the amount you want to bet per line: ");
    const betAmount = parseFloat(bet);
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance / numberOfLines) {
      console.log("Invalid bet amount, try again.");
    }
    else {
      return betAmount;
    }
  };
}

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol)
    }
  }

  const reels = [[],[],[]];
    for (i = 0; i < COLS; i++){
      reels.push([]);
      const reelSymbols = [...symbols];
      for (j = 0; j < ROWS; j++){
        const randomIndex = Math.floor(Math.random () * reelSymbols.length);
        const selectedSymbol = reelSymbols[randomIndex];
        reels[i].push(selectedSymbol);
        reels.splice(randomIndex, 1);
      }
    }
    return reels;
} 

const transpose = (reels) => {
  const rows = []
  for (let i = 0; i < ROWS; i++) {
    rows.push([])
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i])
    }
  }
  return rows
}

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = ""
    for (const [i, symbol] of row.entries()) {
      rowString += symbol
      if (i != rows.length - 1) {
        rowString += " | "
      }
    }
    console.log(rowString)
  }
}

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    const allSame = true;
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        let allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * SYMBOLS_VALUE[symbols[0]]
    }
  }
  return winnings;
}

const game = () => {
  let balance = deposit();
  while (true) {
    console.log("You have a balance of $" + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBetAmount(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You win, $" + winnings.toString());
    if (balance <= 0) {
      console.log("You ran out of dollar bills!");
      break;
    }
    const playAgain = prompt("Do you want to play again? (y/n)") 
    if (playAgain != "y" ) break;
  }
};

game();


