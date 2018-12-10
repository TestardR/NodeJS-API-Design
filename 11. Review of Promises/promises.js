// CALLBACKS

// var action = function(cb) {
//   setTimeout(function() {
//     cb('hey');
//   }, 5000);
// };

// action(function(arg) {
//   console.log(arg);
// });

// SAME WITH PROMISE

// var action = function() {
//   return new Promise(function(resolve, reject) {
//     setTimeout(function() {
//       // resolve('hey');
//       reject(new Error('noooo'));
//     }, 5000);
//   });
// };

// action()
//   .then(function(word) {
//     console.log(word);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

// CONSUMING PROMISES

// var fs = require('fs');

// var readFile = function() {
//   return new Promise(function(resolve, reject) {
//     fs.readFile('./package.json', function(err, file) {
//       return err ? reject(err) : resolve(file.toString());
//     });
//   });
// };

// readFile()
//   .then(function(file) {
//     console.log(file);
//   })
//   .catch(function(err) {
//     console.log(err);
//   })
//   .finally(function(call) {
//     var call = 'Hello ?';
//     console.log(call);
//   });

// NESTED PROMISES

var fs = require('fs');

var readFile = function() {
  return new Promise(function(resolve, reject) {
    fs.readFile('./package.json', function(err, file) {
      return err ? reject(err) : resolve(file.toString());
    });
  });
};

// readFile()
//   .then(function(file) {
//     return 'hey';
//   })
//   // whatever we return, it is a promise
//   .then(function(word) {
//     return 'ohhh!';
//   })
//   .catch(function() {});

// Case with many promises, we can call .all, to run all promises

var readAllFiles = function() {
  var promises = [readFile(), readFile(), readFile()];
  return Promise.all(promises);
};

var logFile = function() {
  return readFile().then(function() {
    return readFile();
  });
};

readAllFiles().then(function(files) {
  console.log(files);
});
