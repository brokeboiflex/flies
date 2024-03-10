// Fly mating experiment
//
//

const _ = require("lodash");

const generations = 4;

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const femaleArchetypes = [{ type: "picky" }, { type: "passionate" }];
const maleArchetypes = [{ type: "cool" }, { type: "klutz" }];

const females = shuffle([
  ...Array(3).fill(femaleArchetypes[0]),
  ...Array(3).fill(femaleArchetypes[1]),
]);
const males = shuffle([
  ...Array(3).fill(maleArchetypes[0]),
  ...Array(3).fill(maleArchetypes[1]),
]);

// console.log("gen 1:");
// console.log("females:", females);
// console.log("males:", males);

function breed(males, females) {
  let m = males.slice();
  let f = females.slice();
  for (var k = 0; k < generations - 1; k++) {
    const offspringMales = [];
    const offspringFemales = [];
    const breedingFemales = shuffle(f).slice(0, 6);
    const breedingMales = shuffle(m).slice(0, 6);

    for (var i = females.length - 1; i >= 0; i--) {
      const female = breedingFemales[i];
      const male = breedingMales[i];
      //   console.log("female", female);
      //   console.log("male", male);
      // breed
      if (!(male.type === "klutz" && female.type === "picky")) {
        // console.log("breed", male, female);
        offspringFemales.push(female);
        offspringMales.push(male);
      }
      //   die
      else {
        const mindexToRemove = _.findIndex(m, { type: "klutz" });
        const findexToRemove = _.findIndex(f, { type: "picky" });
        if (mindexToRemove !== -1) {
          _.remove(m, (item, index) => index === mindexToRemove);
        }
        if (findexToRemove !== -1) {
          _.remove(f, (item, index) => index === findexToRemove);
        }
      }
    }
    m.push(...offspringMales);
    f.push(...offspringFemales);
    console.log(`gen ${k + 2}`);
    console.log(`females:`, f);
    console.log(_.countBy(f, "type"));
    console.log(`males:`, m);
    console.log(_.countBy(m, "type"));
  }
}
breed(males, females);
