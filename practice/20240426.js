/**
 * promise
 */

new Promise(resolve => {
  setTimeout(() => {
    resolve();
  }, 1000);
}).then(() => {
  console.log('1');
});
setTimeout(() => {
  console.log('@');
}, 1000);
