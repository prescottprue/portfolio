var _=require("./"),sauceBrowsers=_.reduce([["firefox","35"],["firefox","30"],["firefox","20"],["firefox","11"],["firefox","4"],["chrome","40"],["chrome","35"],["chrome","28"],["internet explorer","11","Windows 8.1"],["internet explorer","10","Windows 8"],["internet explorer","9","Windows 7"],["opera","12"],["opera","11"],["android","4.3"],["android","4.0"],["safari","8"],["safari","6"],["safari","7"],["safari","5"]],function(a,b){var c=(b[0]+"_v"+b[1]).replace(" ","_").toUpperCase();return a[c]=_.pick({base:"SauceLabs",browserName:b[0],version:b[1],platform:b[2]},Boolean),a},{});module.exports=function(a){return process.env.SAUCE_USERNAME&&process.env.SAUCE_ACCESS_KEY?void a.set({basePath:"",frameworks:["qunit"],singleRun:!0,files:["test/vendor/qunit-extras.js","underscore.js","test/*.js"],reporters:["dots","saucelabs"],port:9876,colors:!0,logLevel:a.LOG_INFO,sauceLabs:{build:"TRAVIS #"+process.env.TRAVIS_BUILD_NUMBER+" ("+process.env.TRAVIS_BUILD_ID+")",startConnect:!0,tunnelIdentifier:process.env.TRAVIS_JOB_NUMBER},transports:["xhr-polling"],captureTimeout:12e4,customLaunchers:sauceBrowsers}):(console.log("Sauce environments not set --- Skipping"),process.exit(0))};