/*
 * The Node.js Master Class Homework Assignment #1
 *
 * Please create a simple "Hello World" API. Meaning:
 *
 *  1. It should be a RESTful JSON API that listens on a port of your choice.
 *  2. When someone posts anything to the route /hello, you should return a
 *     welcome message, in JSON format. This message can be anything you want.
 *
 * NOTE: Using ES6 as much as possible without engaging experimental features
 *       Using WHATWG URL API rather than the Legacy URL API
 */

// Dependencies
const http = require('http');
const { URL, URLSearchParams } = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const hellosLib = require('./lib/hellos');

// app object
const app = {};

// Function that returns JSON Hellos
app.getHellosJSON = () => {

  // Get all the hellos
  const allHellos = hellosLib.allHellos();

  // console.log(allHellos);

  return allHellos;
};

// Instantiating the HTTP server
const httpServer = http.createServer( (req,res) => {
  unifiedServer(req,res);
});

// Start the HTTP server and listen on the configuration mode port
httpServer.listen(config.httpPort, () => {
  console.log(`The HTTP server is listening on port ${config.httpPort} in ${config.envName} mode`);
});

// Unified server functionality. Can add HTTPS server to share this same functionality later, if desired.
const unifiedServer = (req,res) => {

  // Check for authorization header content
  function buildUri() {
    if (req.headers && req.headers.authorization) {
      const header=req.headers.authorization;
      const token=header.split(/\s+/).pop()||'';
      const auth = new Buffer.from(token, 'base64').toString();
      const parts=auth.split(/:/);
      const username=parts[0];
      const password=parts[1];
      console.log(`
      Auth info:
        username: ${username}
        password: ${password}
        `);
        return  `http://${username}:${password}@${req.headers.host}${req.url}`;
    }
    else {
      return `http://${req.headers.host}${req.url}`;
    }
  }

  // Get the URL and parse it
  const baseURL = buildUri();
  const parsedURL = new URL(req.url, baseURL);

  // Get the path from the URL
  const path = parsedURL.pathname;

  // Strip off preceeding or trailing slashes
  const trimmedPath = path.replace(/^\/+|\/+$/g,'');

  // Get the WHATWG URL API querystring object using URLSearchParams contructor
  const searchParams = new URLSearchParams(parsedURL.searchParams);

  // Get the HTTP Method
  const method = req.method.toUpperCase();

  // Get the headers as an object
  const headers = req.headers;

  // Get the payload, if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });
  req.on('end', () => {
    buffer += decoder.end();

    // Choose the handler this request should go to.
    // If one is not found, use the notFound handler
    const chosenHandler = typeof(router[trimmedPath]) != 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct the data object to send to the handler
    const data = {
      'trimmedPath' : trimmedPath,
      'searchParams' : searchParams,
      'method' : method,
      'headers' : headers,
      'payload' : buffer
    };

    // Route the request to the handler specified in the router
    chosenHandler(data, (statusCode, payload) => {
      // Use the status code called back by the handler, or default to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

      // Use the payload called back by the handler, or default to an empty object
      payload = typeof(payload) == 'object' ? payload : {};

      // Convert the payload to a string
      const payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // Populate the console content
      const parsedResponse = (`Hello, here are your request details:

      parsedURL.hash.........: ${parsedURL.hash}
      parsedURL.host.........: ${parsedURL.host}
      parsedURL.hostname.....: ${parsedURL.hostname}
      parsedURL.href.........: ${parsedURL.href}
      parsedURL.origin.......: ${parsedURL.origin}
      parsedURL.password.....: ${parsedURL.password}
      parsedURL.pathname.....: ${parsedURL.pathname}
      parsedURL.port.........: ${parsedURL.port}
      parsedURL.protocol.....: ${parsedURL.protocol}
      parsedURL.search.......: ${parsedURL.search}
      parsedURL.searchParams.: ${parsedURL.searchParams}
      parsedURL.username.....: ${parsedURL.username}
      parsedURL.toString()...: ${parsedURL.toString()}
      path...................: ${path}
      trimmedPath............: ${trimmedPath}
      method.................: ${method}
      searchParams...........: ${searchParams.toString()}
      payload................: ${buffer}
      headers................: \n${JSON.stringify(headers,null, 2)}\n`);

      // Log the request details
      console.log(parsedResponse+'\n');
      console.log('Returning this response:\n\n', statusCode, payloadString);
      console.log(`
      ... and some file readline console output I am still working on ...

      `);
    });
  });
};

// Define the handlers
const handlers = {};

// Hello handler
handlers.hello = (data, callback) => {
  // Callback an HTTP Status 200 code (OK) and a payload
  // callback(200, app.getHellosJSON());
  callback(200, app.getHellosJSON());
};

// Not found handler
handlers.notFound = (data, callback) => {
  callback(404);
};

// Define a request router
const router = {
  'hello' : handlers.hello
};
