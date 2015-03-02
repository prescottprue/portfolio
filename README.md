# Personal Portfolio Page

  This application, which is available at [prescottprue.com](http://prescottprue.com) is a portfolio page that includes projects I have started or been involved with.

## Development

  Run `grunt` to start a server locally.

## Staging

  [Staging version](https://s3-us-west-2.amazonaws.com/prescottprue.com/staging/1.0.0/index.html) built uploaded via `grunt stage`

**Note:** Uploading requires either a `env.json` file or Path Variable to set S3 Bucket and Key. 

## Project Data

  Project data is stored with a firebase named *Prue* that is located at [prue.firebaseio.com](https://prue.firebaseio.com). Security rules have been implemented to keep project data from being edited by others.

## Dependencies

  * [AngularJS](http://angularjs.org)
  * [Angular Material](https://material.angularjs.org/#/)
  * [AngularFire](https://www.firebase.com/docs/web/libraries/angular/api.html)
  * [Firebase](http://firebase.com)

### Development

* [GruntJS](http://gruntjs.com)

## License

Copyright (c) 2014 Prescott Prue

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
