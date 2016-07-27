/**
small promise function to make us wait for the loader animation to finish at least once.
**/

  let sleep = (time: number) => {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {

        resolve();
      }, time);

    });
  }

  export {sleep};
