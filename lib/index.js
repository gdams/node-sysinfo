'use strict';

var fs = require('fs');
var execSync = require('child_process').execSync;
var _ = require('lodash');

var version = process.version;
var platform = process.platform;
var arch = process.arch;
var distro = '';
var release = '';

if (fs.existsSync('/etc/os-release')) {
  var osRelease = require('dotenv').config({path: '/etc/os-release', silent: true});
  distro = osRelease['ID'] || '';
  release = osRelease['VERSION_ID'] || '';
} else if (platform === 'darwin') {
  distro = 'macos';
  release = execSync('sw_vers -productVersion').toString() || '';
  release = release.replace(/(\r\n|\n|\r)/gm,'') || '';
} else if (platform === 'aix' ) {
  release = execSync('oslevel').toString() || '';
  release = release.replace(/(\r\n|\n|\r)/gm,'') || '';
}

var endian = process.config.variables.node_byteorder || '';

console.log("you are running " + distro + " " + release + ", on " + arch);
