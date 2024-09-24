// ## talent.io software homework

// ### Instructions

// Hello there! Thank you for considering talent.io as your next company.
// We would like to know more about your experience with programming and problem solving.
// There are 2 independent parts to this assignment:

// - Part 1: Volleyball simulation (Backend)
// - Part 2: Coloured Squares (Frontend)

// You can code the assignment in Ruby, Python, or JavaScript.
// You can use any backend or frontend library that you deem useful.
// Just so you know, our stack at talent.io is Ruby 2.6.x, Rails 6, React.js.
// When you are done, please send us your solutions by inviting us to a private GitHub repo.

// Tips:

// -	Reach out to us if you have any question! We will be happy to clarify anything if needed.
// -	Comment your code to let us know what choices you made and why.
// -   Test your code.
// -	Don’t be afraid to ask Google for help.
// -	We expect you to spend between 2h and 4h on this assignment, depending on your level of experience.

// ### Part 1: Volleyball simulation (Backend)

// The objective is to write a program that simulates a game of Volleyball between Team 1 and Team 2.

// The program takes 2 inputs:
// - p1 = The probability that Team 1 wins the point when Team 1 is serving
// - p2 = The probability that Team 2 wins the point when Team 2 is serving

// The rules:
// 1. To win the match, a team must win 3 sets.
// 2. To win a set, a team must win at least 25 points with a 2-points margin minimum, e.g. 25-17, 24-26, 28-26.
// 3. Exception to rule #2: If both teams are tied at 2 sets, the fifth and last set ends in 15 points, again with a 2-points margin minimum.
// 4. Team 1 starts serving in set 1, Team 2 starts serving in set 2, Team 1 starts serving in set 3, and so on.
// 5. The team that won the previous point serves for the next point, unless the set is just starting.

// The output of the program is the list of scores, from the beginning to the end of the game.

// Example, if team 1 wins all points:

// rb
// VolleyballSimulator.run(1.0, 0.0) == [
//   "0-0", # Game starts
//   "1-0", # Team 1 wins 1st point
//   "2-0",
//   # ...
//   "25-0",
//   "25-0 1-0",
//   "25-0 2-0",
//   # ...
//   "25-0 25-0",
//   "25-0 25-0 1-0",
//   "25-0 25-0 2-0",
//   # ...
//   "25-0 25-0 25-0" # Game ends
// ]

function volleyMatch(p1: number, p2: number): string[] {
  let score1 = 0;
  let score2 = 0;
  let scoresActuel = `${score1}-${score2}`;
  let scoresPasse = "";
  let scoresTab = [scoresActuel];
  let nbSet1 = 0;
  let nbSet2 = 0;

  //scénarios équipe 1 ou équipe 2 sert

  function service1(max: number) {
    if (Math.random() >= p1) {
      score2 += 1;
      scoresActuel = `${score1}-${score2}`;
      scoresTab.push(`${scoresPasse} ${scoresActuel}`);
      if (!verifVictoire2(max)) {
        service2(max);
      } else {
        scoresPasse += `${scoresActuel} `;
        score1 = 0;
        score2 = 0;
        scoresActuel = `${score1}-${score2}`;
        scoresTab.push(`${scoresPasse} `);
        nbSet2 += 1;
      }
    } else {
      score1 += 1;
      scoresActuel = `${score1}-${score2}`;
      scoresTab.push(`${scoresPasse} ${scoresActuel}`);
      if (!verifVictoire1(max)) {
        service1(max);
      } else {
        scoresPasse += `${scoresActuel} `;
        score1 = 0;
        score2 = 0;
        scoresActuel = `${score1}-${score2}`;
        scoresTab.push(`${scoresPasse}`);
        nbSet1 += 1;
      }
    }
  }

  function service2(max: number) {
    if (Math.random() >= p2) {
      score1 += 1;
      scoresActuel = `${score1}-${score2}`;
      scoresTab.push(`${scoresPasse} ${scoresActuel}`);
      if (!verifVictoire1(max)) {
        service1(max);
      } else {
        scoresPasse += `${scoresActuel} `;
        score1 = 0;
        score2 = 0;
        scoresActuel = `${score1}-${score2}`;
        scoresTab.push(`${scoresPasse} `);
        nbSet1 += 1;
      }
    } else {
      score2 += 1;
      scoresActuel = `${score1}-${score2}`;
      scoresTab.push(`${scoresPasse} ${scoresActuel}`);
      if (!verifVictoire2(max)) {
        service2(max);
      } else {
        scoresPasse += `${scoresActuel} `;
        score1 = 0;
        score2 = 0;
        scoresActuel = `${score1}-${score2}`;
        scoresTab.push(`${scoresPasse} `);
        nbSet2 += 1;
      }
    }
  }

  //vérif fin de sets

  function verifVictoire1(max: number): boolean {
    return score1 >= max ? (score1 - score2 >= 2 ? true : false) : false;
  }
  function verifVictoire2(max: number): boolean {
    return score2 >= max ? (score2 - score1 >= 2 ? true : false) : false;
  }

  //déroulement du match
  service1(25);
  service2(25);
  service1(25);
  if (nbSet1 !== 3 && nbSet2 !== 3) {
    service2(25);
  }
  if (nbSet1 !== 3 && nbSet2 !== 3) {
    service1(25);
  }
  if (nbSet1 !== 3 && nbSet2 !== 3) {
    service2(15);
  }

  //retour du score final
  return scoresTab;
}

console.dir(volleyMatch(0.7, 0.75), { depth: null, maxArrayLength: null });


