'use strict';

const http = require('http');
const sockjs = require('sockjs');
const node_static = require('node-static');

// 1. Echo sockjs server
const sockjs_opts = {
};

let count = 0;

const sockjs_echo = sockjs.createServer(sockjs_opts);
sockjs_echo.on('connection', function(conn) {
	console.log('[connection]')
	conn.on('data', function(message) {
		conn.write('received: ' + message||'?');
    });
	setInterval(function(){
		console.log('[send]', Date.now())
		let send = '['
		for (let i = 0; i < 10; i++) {
			send += `[${(20 * Math.random()).toFixed(2)},${(20 * Math.random()).toFixed(2)}],`
		}
		conn.write(send.replace(/.$/,']'));
		count += 1;
	},3000);
	
});

// 2. Static files server
const static_directory = new node_static.Server(__dirname);

// 3. Usual http stuff
const server = http.createServer();
server.addListener('request', function(req, res) {
  static_directory.serve(req, res);
});
server.addListener('upgrade', function(req, res) {
  res.end();
});

sockjs_echo.installHandlers(server, {prefix:'/ws'});

console.log(' [*] Listening on 0.0.0.0:22000');
server.listen(22000, '0.0.0.0');