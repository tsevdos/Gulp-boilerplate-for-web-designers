# Gulp boilerplate for web designers

**Gulp boilerplate for web designers** provides directory and file structure to aid web-designers kickstart their next project. It will help you develop and deploy any html-based (and more) templates. Some out of the box features :

- OOCSS and [SMACSS (Scalable and Modular Architecture for CSS) ](http://smacss.com/) ready infrastructure
- Compile Sass files
- Autoprefix styles (you only need to write the web-standard version)
- [Compass](http://compass-style.org/) support
- Compiles and lints Coffee scripts files
- JsLinter
- CSS and JS minification
- Compiles Jade
- Image optimization

## Dependencies

You need to install [SASS](https://rubygems.org/gems/sass) and [compass](https://rubygems.org/gems/compass) ruby gems. To do that make sure you have ruby installed and then type the below commands:
`gem update --system`
`gem install sass`
`gem install compass`

## Installation

Follow the [Getting Started with Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started) for an in-depth look at setting up Grunt, but basically:

1. Boot up terminal
2. Make sure to have **[Node.js](http://nodejs.org/download/)** installed
3. Install **gulp globally** `npm install -g gulp`
4. `cd` to your project folder
5. Git clone (`git clone git@github.com:tsevdos/Gulp-boilerplate-for-web-designers.git`) or [download and extract the zip file](https://github.com/tsevdos/Gulp-boilerplate-for-web-designers)
7. Install Gulp and required grunt tasks by typing `npm install`
8. Run `gulp`

## File structure

Your **development environment** is in the **app directory** - you do all the work there. Whenever you are ready you can **build** the work by running the `gulp` task (the `default` task). This task will generate a **public directory** that will contain all your files (CSS, JS, HTML and images) optimized and ready to distribute/upload/share.

## Tasks

You can run the below tasks.

1. `gulp` (default task) : Creates a `public` directory with all the optimized files (read **File structure** section for more details).
2. `gulp watch` : Probably the most usable task. Just run this task and whatever file you edit any file (html, scss, coffee, js, etc.) it passes it through the appropriate pipeline (task).
3. `gulp styles` : This task compiles all the Sass files and autoprefixes. After that it saves the generated CSS files expanded into the `development` directory and the minified version into the public directory.
4. `gulp coffee` : This task lints and compiles your coffee script files (you must include them into the `js` directory).
5. `gulp lintscripts` : This task lints all javascripts files except from those located under the `vendor` directory.
6. `gulp scripts` : This task will concatanate all scripts into one using the order you'll specify. The `public` version of this file will also be minified.
7. `gulp images` : This task will optimize all images (with `jpg`, `png` and `gif` extension) under the `img` folder.
8. `gulp jade` : This task will compile your jade templates.
9. `gulp markup` : This task will pretify your html files.
10. `gulp clean` : This support task cleans (deletes all the contents of) the `public` directory in order to prepare it for the `build` (default task).

## TODO:

- Add a gulp-live-server reload task
