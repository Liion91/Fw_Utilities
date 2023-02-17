"use strict";
const AWS = require("aws-sdk");
const Response = require("./libs/services/httpResponse");
const elasticbeanstalk = new AWS.ElasticBeanstalk();

exports.handler = (event, context, callback) => {
  var params = {
    EnvironmentName: process.env.EBENVNAME,
    EnvironmentId: process.env.EBENVID,
  };
  console.log(params);

  const response = new Response();
  response.enableCors();

  elasticbeanstalk.restartAppServer(params, function (err, data) {
    if (err) {
      console.log("Error ", err.message);
      out(response, callback, 400, { message: JSON.stringify(err.message) });
    } else {
      console.log("OK ", data);
      out(response, callback, 200, { status: "200" });
    }
  });
};

const out = (response, callback, status, body = null) => {
  response.status(status);
  response.body(body ? body : []).toJSON();
  console.log(response);
  callback(null, response);
};
