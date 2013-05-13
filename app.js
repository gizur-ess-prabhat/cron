
//------------------------------
//
// 2012-10-18, Jonas Colmsjö
//
// Copyright Gizur AB 2012
//
// Functions:
//  * Schedule jobs cron-style
//  * Provide a central logging function to be used by applications
//
// Install with dependencies: npm install 
//
// Documentation is 'docco style' - http://jashkenas.github.com/docco/
//
// Using Google JavaScript Style Guide - http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
//
//------------------------------


"use strict";


// Includes
// =========

var express = require('express');
var http = require('http');
var cronJob = require('./lib/cron').CronJob;

var recur = require('later').recur
        , cron = require('later').cronParser
        , text = require('later').enParser
        , later = require('later').later;

// Scedular Time
// =============
// 
// This time will later come from Rest API
// 
// 0: Run in every 5 minutes
// 1: Run in every 8 minutes
// 2: Run in every 12 minutes
// 3: Run in every 15 minutes
var cronTime = ['*/5 * * * *', '*/8 * * * *', '*/12 * * * *', '*/15 * * * *'];
// Variables
// =========

var cronlog = [],
        counter = 0,
        // Number of rows to keep in the log
        rowsToShow = 1000,
        // Port to use when no running in heroku etc.
        serverPort = 5000,
        // Use the port specified unless for istance heroku already has assinged one
        port = process.env.PORT || serverPort,
        serverURL = (process.env.PORT) ? config.HEROKU_URL + '/log' : 'http://localhost:' + port + '/log';

// Web Server that displays the log
// ================================

var app = express();


function logMessage(msg) {

    // Save message to log
    cronlog.push(msg);

    // Print to console
    console.log(msg);

}

// Support JSON, urlencoded, and multipart requests
app.use(express.bodyParser());

// Schedule heartbeat cron job to run every 15 minutes
new cronJob(
        '*/1 * * * * *',
        function() {
            cronTime.forEach(function(element, index, array) {
                var cSched = cron().parse(element);

                if (later().isValid(cSched, new Date())) {
                    logMessage(JSON.stringify({
                        "timestamp": new Date(),
                        "message": "Success",
                        "response": "[" + index + "(" + element + ")]"
                    }));
                }
            });
        }, null, true, "Europe/Stockholm");

// Show cronlog in web server
app.get('/log', function(request, response) {
    var html = '<html><meta http-equiv="refresh" content="5; URL=' + serverURL + '">' +
            '<body>' +
            '<h1>Cronlog!</h1>' +
            cronlog.join('<br>') +
            '</body></html>';
    response.send(html);
});

// For Health checker
//----------------------
app.get('/', function(request, response) {
    response.send(200, {
        "msg": "Everything is ok"
    });
});
// Start the web server
// ---------------------

app.listen(port, function() {
    logMessage("Listening on " + port);
});
