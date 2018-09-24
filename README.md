# node-nmc-homework-1
The Node.js Master Class Homework Assignment #1

Please create a simple "Hello World" API. Meaning:

1. It should be a RESTful JSON API that listens on a port of your choice.

2. When someone posts anything to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want.

# Hello Route

```
http://localhost:3000/hello
```

Example JSON Return:

```json
{
  "stanza" : "Hello (hello hello), is there anybody in there? Just nod if you can hear me.",
  "song" : "Comfortably Numb",
  "artist" : "Pink Floyd"
}
```

# Testing with Postman
If you clone the repo you can also import the `NMC-HW1.postman_collection.json` into your local [Postman](https://www.getpostman.com/postman) application to more easily run a request against either the `staging` or `production` configuration. See the __NOTE__ section below about the WHATWG URL API. The included Postman collection file will pass in more request elements to better illustrate the WHATWG URL API functionality - assuming I did it right. 🤨

__IMPORTANT:__ The Postman `NMC-HW1.postman.collection.json` file is using the recommended version 2.1.0. More information in this [Postman Collection Format blog post](http://blog.getpostman.com/2015/06/05/travelogue-of-postman-collection-format-v2/). If you are using an older version of Postman - it might be time to upgrade.

I am using the native Mac OS and Windows Postman, version 6.3.0 as of this README commit.

Comparison between Postman, Postman Pro, and Postman Enterprise is [here](https://www.getpostman.com/pricing)

Don't `Run the collection` since it will try and run both saved requests in the collection. One request is for `staging`, the other request is for `production`.

Instead, expand the collection and run the request for whichever environment you have node running in:
  * staging: Use the `NMC-HW1 staging` request.
  * production: Use the `NMC-HW1 production` request.

# NOTE
Currently, you will also see several lines of console output to demonstrate:
  * How I have implemented the [WHATWG URL API](https://nodejs.org/dist/latest-v8.x/docs/api/url.html#url_the_whatwg_url_api) rather than the [Legacy URL API](https://nodejs.org/dist/latest-v8.x/docs/api/url.html#url_legacy_url_api).
    * There is no `url.parse()` function in the WHATWG URL API.
    * Instead of getting a querystring object, you use the [URLSearchParams](https://nodejs.org/dist/latest-v8.x/docs/api/url.html#url_class_urlsearchparams) class.
    * I wanted to use the WHATWG URL API because the nodeJS documentation states:
      <blockquote>Note: While the Legacy API has not been deprecated, it is maintained solely for backwards compatibility with existing applications. New application code should use the WHATWG API.</blockquote>
  * Both RAW and JSON formatted lines from the included `hellos.txt` file. Goal is to either return all the lines as a single JSON of `JSON hellos`, or randomly return one JSON-formatted line with each request. Look for a future refactor...
