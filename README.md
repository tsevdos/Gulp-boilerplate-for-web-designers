# Gulp boilerplate for web designers

## Work and documentation in progress

**Gulp boilerplate for web designers** provides a nice directory and file structure to aid web-designers kickstart their next project. It will help you in the development and deployment process of any HTML-based (and not only) template. Some of the features that you get out of the box are:

- OOCSS and [SMACSS (Scalable and Modular Architecture for CSS) ](http://smacss.com/) ready infrastructure
- Compile Sass files
- Autoprefix styles (you only need to write the web-standard version)
- [Compass](http://compass-style.org/) support
- Compiles and lints Coffee scripts files 
- JsLinter
- CSS and JS minification
- Compiles Jade
- Image optimization

## Installation

Follow the [Getting Started with Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started) for an in-depth look at setting up Grunt, but basically:

1. Boot up terminal
2. Make sure to have **[Node.js](http://nodejs.org/download/)** installed.
3. Install **gulp globally** `npm install -g gulp`
4. `cd` to your project folder
5. Git clone (`git@github.com:tsevdos/Gulp-boilerplate-for-web-designers.git`) or download the zip from [https://github.com/tsevdos/Gulp-boilerplate-for-web-designers](https://github.com/tsevdos/Gulp-boilerplate-for-web-designers)
7. Install Gulp and required grunt tasks `npm install`
8. Run `gulp serve` and enjoy

## File structure

Your **development environment** is the into the **app directory** - you do all the work there. Whenever you are ready you can **build** the work by running the `gulp` task. This task will generate a **public directory** that will contain all your files (CSS, JS, HTML and images) optimized and ready to distribute/upload/share.

## Tasks

You can run the below tasks.

1. `gulp` (default task) : Creates a `public` directory with all the optimized files (read **File structure** section for more details).
2. Soon available...

## TODO:

- Add [Burbon](http://bourbon.io/) support
- Fix Live-reloadx