/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function wait1(t) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, t * 1000);
  });
}

function wait2(t) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, t * 1000);
  });
}

function wait3(t) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, t * 1000);
  });
}

function calculateTime(t1, t2, t3) {
  return new Promise((resolve) => {
    let total = 0;
    let start = Date.now();

    // all those function returns a promise
    // therefore .then() and do calculations

    // chaining the promises sequentially
    wait1(t1)
      .then(() => {
        return wait2(t2);
      })
      .then(() => {
        return wait3(t3);
      })
      .then(() => {
        total = Date.now() - start;
        resolve(total);
      });
  });
}

module.exports = calculateTime;
