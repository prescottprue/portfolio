# Personal Portfolio Page

  This application, which is available at [prescottprue.com](http://prescottprue.com) is a portfolio page that includes projects I have started or been involved with. The project information is stored in Firebase so that viewers have real-time project information!

## Getting Started

1. Clone this repository: `git clone git@github.com:prescottprue/portfolio.git`
2. Navigate into it and run `npm install`.
3. Run `bower install` for front end dependencies.
4. Run `grunt` to start the development server.

## Development

  Run `grunt` to start a server locally that auto-reloads when dev files are changed.

## Staging

  [Staging version](https://s3-us-west-2.amazonaws.com/prescottprue.com/staging/1.0.0/index.html) built uploaded via `grunt stage`

**Note:** Uploading requires either a `env.json` file or Path Variable to set S3 Bucket and Key.

## Project Data

  Project data is stored with a firebase named *Prue* that is located at [prue.firebaseio.com](https://prue.firebaseio.com). Security rules have been implemented to keep project data from being edited by others.

## Planning

* Move Images to CDN
* Implement FireAdmin for admin login
* Simple Edit Page for Project Data (Bound data from firebase for realtime content editing!)

## Dependencies

  * [AngularJS](http://angularjs.org)
  * [Angular Material](https://material.angularjs.org/#/)
  * [AngularFire](https://www.firebase.com/docs/web/libraries/angular/api.html)
  * [Firebase](http://firebase.com)

### Development

* [GruntJS](http://gruntjs.com)
