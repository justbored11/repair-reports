const mongoose = require("mongoose");
const Repair = require("../models/Repair");

//returns array to use in aggregate
function getAggregate(str) {
  if (str === "" || str === undefined) return [];
  const aggregateArr = makeQuerys(str);

  return aggregateArr;
}

//make querys for aggregate query
function makeQuerys(str) {
  if (str === "" || str === undefined) return [];
  //get all words and remove spaces and save into array
  const wordsArr = str.split(" ").filter((word) => {
    const noSpace = word.trim();
    if (noSpace !== "") {
      return true;
    }
    return false;
  });

  //make query objects from array
  const querys = wordsArr.map((word) => {
    return {
      text: {
        query: word,
        path: { wildcard: "*" },
        fuzzy: { maxEdits: 1.0 },
      },
    };
  });

  return querys;
}

module.exports = { getAggregate, makeQuerys };
