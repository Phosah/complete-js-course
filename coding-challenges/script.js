"use strict";
///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

*/

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.
const [players1, players2] = game.players;

// 2.
let [gk, ...fieldPlayers] = players1;

// 3.
let allPlayers = [...players1, ...players2];

// 4.
let players1Final = ["Thiago", "Coutinho", "Perisic", ...players1];

// const { team1, team2, x: draw } = game.odds;

const {
  odds: { team1, team2, x: draw },
} = game;

// 6.
function printGoals(...players) {
  for (const player of players) {
    let playerCount = players.filter((p) => p === player).length;
    // console.log(`Player ${player} scored ${playerCount} goals.`);
  }
  // console.log(`Players scored ${players.length} goals.`);
}
printGoals(...game.scored);

// 7.
team1 < team2 && console.log("Team 1 is more likely to win");
team1 > team2 && console.log("Team 2 is more likely to win");

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

// 1.
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1} : ${player}`);
}

// 2.
const odds = Object.values(game.odds);
let average = 0;
for (const odd of odds) average += odd;
average /= odds.length;
console.log(average);

// 3.
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === "x" ? "draw" : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr} ${odd}`);
}

// Bonus.
const scorers = {};
for (const player of game.scored) {
  console.log(player);
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, it was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, "⚽️ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽️ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽️ GOAL"],
  [80, "⚽️ GOAL"],
  [92, "🔶 Yellow card"],
]);

// 1.
const e = [...new Set(gameEvents.values())];
console.log(e);

// 2.
gameEvents.delete(61);

// 3.
console.log(`An event happened on average of ${90 / gameEvents.size} mins`);

const time = [...gameEvents.keys()].pop();
console.log(time);
console.log(`An event happened on average of ${time / gameEvents.size} mins`);

// 4.
for (const [t, eve] of gameEvents) {
  console.log(eve);
  const half = t < 45 ? "[FIRST HALF]" : "[SECOND HALF]";
  console.log(`${half} : ${t}: ${eve}`);
}

///////////////////////////////////////
// String Methods Practice

const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = (str) => str.slice(0, 3).toUpperCase();

for (const flight of flights.split("+")) {
  const [type, from, to, time] = flight.split(";");
  const output = `${type.startsWith("_Delayed") ? "🔴" : ""}${type.replaceAll(
    "_",
    " "
  )} ${getCode(from)} ${getCode(to)} (${time.replace(":", "h")})`.padStart(36);
  console.log(output);
}

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

document.querySelector("button").addEventListener("click", function () {
  const text = document.querySelector("textarea").value;
  const rows = text.split("\n");

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split("_");

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${"✅".repeat(i + 1)}`);
  }
});

//

// Coding practice

// Addition solutions
// 1.
for (let i = 0; i < game.scored.length; i++) {
  console.log(`Goal ${i + 1}: scored by ${game.scored[i]}`);
}

for (const [i, player] of game.scored.entries())
  console.log(`Goal ${i + 1}: scored by ${player}`);

// 2.
for (const [key, values] of Object.entries(game.odds)) {
  // console.log(key);
  key === "x"
    ? console.log(`The draw average is ${values}`)
    : console.log(`The ${game[key]} average is ${values}`);
  // console.log(`The ${game[key]} average is ${values}`);
}

average /= Object.values(game.odds).length;

// 3.
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === "x" ? "draw" : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr} is ${odd}`);
}

const question = new Map();
console.log(question);
question.set("question", "What is the best programming language");
console.log(question);

// Coding challenge
const airline = "TAP Air Nigeria";
console.log(airline.slice(2, -2));
console.log(airline);

// Learning the call function
const luftansa = {
  airline: "Luftansa",
  iataCode: "LH",
  bookings: [],

  book: function (flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const billyair = {
  airline: "BillyAir",
  iataCode: "BA",
  bookings: [],
};

const book = luftansa.book;

book.call(eurowings, 818, "BillyTrente");
book.call(luftansa, 234, "Phosah");

console.log(eurowings);
console.log(luftansa);

// Bind method
const bookBA = book.bind(billyair);
bookBA(18, "Billy 30");
bookBA(13, "Aise Dark");

console.log(billyair);

luftansa.planes = 200;
luftansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(`${this.planes}`);
};

// luftansa.buyPlane();

document
  .querySelector(".buy")
  .addEventListener("click", luftansa.buyPlane.bind(luftansa));

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.2, 250));

const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(160));

const calculateTAX = function (value) {
  return function (rate) {
    return value + value * rate;
    // console.log(`Task added: ${value + value * rate}`);
  };
};

const addVAT2 = calculateTAX(100);
console.log(addVAT2(0.23));

calculateTAX(300)(0.23);

// Coding challenge
const poll = {
  question: "What is your favorite programming language?",
  options: ["0: Javascript", "1: Python", "2: Rust", "3: C++"],
  answers: new Array(4).fill(0),
  // answers: [0, 1, 2, 3],

  registerNewAnswer: function () {
    console.log(this.options.join("\n"));

    // console.log(this.question);
    // for (const [key, value] of Object.entries(this.options)) {
    //   console.log(value);
    // }

    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join("\n")}\n(Write option number)`
      )
    );

    // My working solution refactored
    // if (isNaN(answer)) {
    //   return;
    // } else {
    //   for (const [key, value] of Object.entries(this.answers)) {
    //     if (key == answer) {
    //       this.answers[answer]++;
    //     }
    //   }
    //   // console.log(this.answers);
    // }

    answer < this.answers.length &&
      typeof answer === "number" &&
      this.answers[answer]++;

    this.displayResults();
    // this.displayResults("string");
  },

  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(",")}`);
    }
  },
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 4, 5] });
poll.displayResults.call({ answers: [1, 2, 5, 4, 5] }, "string");

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const newBooking = secureBooking();

newBooking();
newBooking();
newBooking();
newBooking();

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";

  document.body.addEventListener("click", function () {
    console.log("clicked");
    header.style.color = "blue";
  });
})();
