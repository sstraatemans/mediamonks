/**
Image preloader.
The loader is called 2 times. 1 time for the preloader
1 time for the app images
**/
  import {PreLoader} from "./preloader.ts";
  import {sleep} from "./sleep.ts";

  //makes sure that the app always starts at page 0. no deeplinking allowed.
  window.location.hash = "#a0";

  var loaderimages = ['image/loaderbg.png','image/monk.png'];
  var appImages = ['image/background.jpg','image/logo.svg','image/svg/mail.svg','image/svg/facebook.svg','image/svg/twitter.svg'];

  //these 2 variables need to be true
  //this way the loader animation is played at least once, when the images are cached or loaded really fast.
  let imagesAllLoaded = false;
  let animationPlayed = false;

  //called when the final images are loaded.
  //now we can check if we can open the app itself.
  let finishLoadingCallback = (allLoaded) => {
    imagesAllLoaded = allLoaded;
    openApp();

  }

  //called after the images of the loader are loaded. now we can start playing the loader animation.
  let openLoaderCallback = () => {
    let loader = document.querySelector(".loader");
    loader.classList.add("open");
    PreLoader.getLoaderImages(appImages, finishLoadingCallback, true);
  }

  //checks if all images are loaded and the animation played at least once.
  //if so, close the loader.
  let openApp = () => {
    if(imagesAllLoaded && animationPlayed){
      let loader = document.querySelector(".loader");
      loader.classList.remove("open");
      loader.classList.add("close");
    }
  }

  PreLoader.getLoaderImages(loaderimages, openLoaderCallback);

  sleep(5500).then(function(){
    animationPlayed = true;
    openApp();
  });
