/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
  return new Promise((resolve) => {
    let start = Date.now();

    // Date.now() returns the current time in milliseconds since 1970

    // Date.now() - start = elapsed time in milliseconds

    // therefore loop till that difference becomes 0, when will it become 0? when it will be equal to milliseconds given

    while (Date.now() - start < milliseconds) {
      // Do Nothing
    }
    resolve();
  });
}

module.exports = sleep;
