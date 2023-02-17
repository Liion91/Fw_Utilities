"use strict";

/**
 * @file This define the HttpResponse class and all of his methods
 * @author Lobertini Mattia
 * @module HttpResponse
 */

/**
 * @classdesc HttpResponse allow controllers to easily create an HttpResponse for API Gateway. The class mimics Express4 Response object providing an easy, chainable, way to create and customize responses
 *
 * @exports HttpResponse
 * @constructor
 */
class HttpResponse {
  /**
   * Create a new HttpResponse
   * @constructor
   */
  constructor() {
    this.response = {
      statusCode: 200,
      headers: {},
      body: "",
    };
  }

  /**
   * Enable cors for the current call
   * @public
   *
   * @returns {HttpResponse}
   */
  enableCors() {
    this.response.headers["Access-Control-Allow-Origin"] = "*";
    this.response.headers["Access-Control-Allow-Headers"] =
      "X-Amz-Security-Token,Content-Type,X-Amz-Date,Authorization,X-Api-Key,Accept,User-Agent";
    this.response.headers["Access-Control-Allow-Methods"] =
      "GET,POST,PUT,DELETE,OPTIONS";
    return this;
  }

  /**
   * Get/Set the current status code of the response
   * @public
   *
   * @param status integer, a valid http status code
   * @returns {*}
   */
  status(status) {
    if (!status) return this.response.statusCode;
    if (isNaN(status)) throw new Error("Status must be an integer number");
    this.response.statusCode = status;
    return this;
  }

  /**
   * Get all the headers, or get the value of a single header or update/set the value of an header
   * @public
   *
   * @param key string, the name of the header, if not provided, all the headers will be returned
   * @param value string, the value of the header, if not provided the current value fo that header will be returned
   * @return {HttpResponse|*} a chainable method or an array of header, or a single header value
   */
  header(key, value) {
    if (!key && !value) return this.response.headers;
    if (!value) return this.response.headers[key];
    this.response.headers[key] = value;
    return this;
  }

  /**
   * Set the response body, if no param is provided return the current body value
   * @public
   *
   * @param body *, a body
   * @return {*} a chainable method or the currect value of body
   */
  body(body) {
    if (!body) return this.response.body;
    this.response.body = body;
    return this;
  }

  /**
   * Return the current object in a json format
   * @public
   *
   * @return {*}
   */
  toJSON() {
    let tmp = Object.assign({}, this.response);
    tmp.body = JSON.stringify(this.response.body);
    tmp.headers["Content-Type"] = "application/json; charset=utf-8";
    tmp.headers["Content-Length"] = tmp.body.length;
    return tmp;
  }

  /**
   * Return the current object in a html format
   * @public
   *
   * @return {*}
   */
  toHTML() {
    let tmp = Object.assign({}, this.response);
    tmp.body = this.response.body;
    tmp.headers["Content-Type"] = "text/html";
    tmp.headers["Content-Length"] = tmp.body.length;
    return tmp;
  }

  toXML() {
    let tmp = Object.assign({}, this.response);
    tmp.body = this.response.body;
    tmp.headers["Content-Type"] = "text/plain";
    tmp.headers["Content-Length"] = tmp.body.length;
    return tmp;
  }
}

module.exports = HttpResponse;
