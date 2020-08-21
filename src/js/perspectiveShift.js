export default function perspectiveShift() {
  const view = document.querySelector(".content"); //container
  const obj = document.querySelector(".cb-svg"); //object

  view.addEventListener("mousemove", e => {
    //get obj dimensions
    let objDimensions = obj.getBoundingClientRect();
    let width = objDimensions.width;
    let height = objDimensions.height;
    //cal cursor in relation to obj's top left (0,0) point
    let x = e.clientX - objDimensions.left;
    let y = e.clientY - objDimensions.top;
    //calc the angle of transforms to track cursor
    let rY = map(x, 0, width, -3, 3);
    let rX = map(y, 0, height, -5, 5);
    //transform the obj
    obj.style.transform = "rotateY(" + rY + "deg)" + " " + "rotateX(" + -rX + "deg)";
  });

  function map(num, in_min, in_max, out_min, out_max)
    //(coordinate num, lower in limit of 0, upper in limit of the obj dimension, lower limit ofangle degree, upper limit of angle degree)
    {
      return Math.round((num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
    }
  
  view.addEventListener("mouseleave", () => {
    //reset transform on leaving the view area
    obj.style.transform = "rotateX(0deg) rotateY(0deg)";
    obj.style.transition = "all 150ms linear 0s";
  });

}