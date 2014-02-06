var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'NAS download list',
  description: 'The nodejs.org web server listing recent NAS downloads.',
  script: 'd:\\dev\\episodelist\\app.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();