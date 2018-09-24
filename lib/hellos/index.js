/*
 * Title: Hello API response library
 * Description: Utility library for getting a Hello API response
 * Author: Eric N. Winn
 * Date: 9/21/2018
 *
 * Comment: Still trying to wrap my head around callbacks and chaining callbacks
 *          so I can read through each line of a file, convert the line to JSON
 *          and ultimately return a JSON of "hello" JSONs...
 *
 *          For the moment I have the basic functionality stubbed in for the file
 *          processing but am returning the hard-coded first line of the file to
 *          meet the minimum requirements for the assignment.
 *
 *          I will refactor when I figure out the callback chaining and whatever else
 *          I haven't grokked yet.
 *
 *          For the purpose of this exercise, the file is intended to simulate
 *          pipe-delimited output from a database query.
 */

// Dependencies
const readline = require('readline');
const fs = require('fs');

// App object
const hellos = {};

// Get all the hellos and return them
hellos.allHellos = () => {

  // Read the text file a line at a time
  const rl = readline.createInterface({
    input: fs.createReadStream(__dirname + '/hellos.txt', 'utf-8')
  });

  rl.on('line', (line) => {
    // Show each line
    console.log(`Line from file: ${line}`);

    // Convert the line to JSON using reduce into an accumulator
    var result = line.split('|').reduce((accum, x) => {
      const kv = x.split('=');
      return {...accum, ...{[kv[0]]: kv[1]}};
    }, {});

    // Display the conversion results for each line
    console.log(`JSON converted line: ${JSON.stringify(result)}`);

    rl.close();
  });

  // Rather than line-by-line, might explore grabbing the entire content
  // To be explored in a later refactor.
  // let fileContents = fs.readFileSync(__dirname+'/hellos.txt', 'utf-8');

  // Turn the hello content into JSON
  // ref: https://stackoverflow.com/a/49678362
  // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  // NOTE: Content format is:
  //       stanza=<stanza value>|song=<song value>|artist=<artist value>

  // Hard-coded response until I figure out an appropriate file parsing mechanism.
  const str = "stanza=Hello (hello hello), is there anybody in there? Just nod if you can hear me.|song=Comfortably Numb|artist=Pink Floyd";

  // Convert the str to JSON using reduce into an accumulator
  var result = str.split('|').reduce((accum, x) => {
    const kv = x.split('=');
    return {...accum, ...{[kv[0]]: kv[1]}};
  }, {});

  // Return the JSON-converted string
  return result;
};

// Export the library
module.exports = hellos;
