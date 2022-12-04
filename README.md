# Roma UA app.

The project uses javascript and includes Admin panel with Mongo database. The frontend build process is handled by Gulp which in turn uses Webpack.

## Prerequisites

You will need the following installed on your system (globally):
* `node`;
* `npm`;
* `mongo`.

Then to pull in all the dependencies just run `npm install`.

## Project Structure

Admin panel source files are stored in `/admin` which uses files found in:
* `resources` - Core files for panel proper structure;
* `translation` - Data files for translation of fields.

Server source files are stored in root of project:
* `models` - Mongo models and helpers for database queries;
* `routes` - API Router and its versions;
* `partials` - Common used templates;
* `views` - Templates for pages and components.

Frontend source files are stored in `/source`:
* `scripts` - Core script files;
* `scss` - General styles, mixins and variables.

### Development

* The project will be run through `npm run develop` which uses `nodemon` and only reloads when backend files change.
* The project uses eslint to unify the code and stored ing `/.eslintrc.js`.
