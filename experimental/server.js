var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
    // Send plain text
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    // res.end('Hello World');

    // Stream image data to the client
    res.writeHead(200, {'Content-Type': 'image/png'});
    fs.createReadStream('./resources/wow-drake.jpg').pipe(res);

}).listen(3000);
console.log('Server running at http://localhost:3000/');

// Alternative
// var server = http.createServer();
// server.on('request', function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World');
// });
// server.listen(3000);
