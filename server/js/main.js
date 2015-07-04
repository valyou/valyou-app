// var fs = Npm.require('fs');

// var fail = function(response) {
//   response.statusCode = 404;
//   response.end();
// };

// var dataFile = function() {
//   // TODO write a function to translate the id into a file path
//   var file = '/public/SA2_cutdown_web.geojson'

//   // Attempt to read the file size
//   var stat = null;
//   try {
//     stat = fs.statSync(file);
//   } catch (_error) {
//     return fail(this.response);
//   }

//   // The hard-coded attachment filename
//   var attachmentFilename = 'somefile.json';

//   // Set the headers
//   this.response.writeHead(200, {
//     'Content-Type': 'application/zip',
//     'Content-Disposition': 'attachment; filename=' + attachmentFilename,
//     'Content-Length': stat.size
//   });

//   // Pipe the file contents to the response
//   fs.createReadStream(file).pipe(this.response);
// };

// Router.route('/geojson/:id', dataFile, {where: 'server'});