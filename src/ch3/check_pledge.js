import { Pledge } from './pledge.js';

new Pledge((resolve, reject) => {
  console.log('top of action callback with double then and a catch');
  setTimeout(() => {
    console.log('about to call resolve callback');

    reject('error on purpose');
    console.log('after resolve callback');
  }, 3000);

  console.log('end of action callback');
}).then((value) => {
  console.log(`first then callback with value: ${value}`);

  return 'first value'
}).then((value) => {
  console.log(`second then callback with value: ${value}`);

  return 'second value'
}).catch((err) => {
  console.log(`in error handler with error: ${err}`)
})
