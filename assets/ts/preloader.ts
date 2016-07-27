/**
Image Preloader class
**/
export class PreLoader {

  /**
  gets an array and makes promises about loading the images.
  returns when everything is loaded.
  **/
  static getLoaderImages = (images, callback, proceedToApp = false) => {
    let arr = [];
    for (let i in images) {
      arr.push(PreLoader.getImage(images[i]));
    }

    Promise.all(arr).then(value => {

      //if proceedToApp is true, than all images are loaded for the app.
      if(proceedToApp){
        callback(true);
      }else{
        callback();
      }

    }, reason => {
      console.log(reason)
    });
  }

  static getImage(src) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
      let img = new Image();
      img.src = src;

      img.onload = function() {

          resolve(img);
      };

      // Handle network errors
      img.onerror = function() {
        reject(Error("Network Error"));
      };
    });
  }
}
