import anime from "animejs";

export default function CharacterBuilder() {
  //timeline vars
  let tl; //object
  let target; //string
  let current; //string
  // svg vars
  const character = document.querySelector("#character");
  //controls
  let intro = document.querySelector(".btn-intro");
  const btns = document.querySelectorAll(".btn-cb");

  //intro button click event and intro animation
  intro.addEventListener("click", () => {
    let introTl = anime.timeline({
      easing: "easeOutElastic",
      duration: 600,
    });
    introTl.add({
      targets: ".btn-intro",
      top: "80%",
    })
    .add({
      targets: ".cb-intro",
      opacity: [1,0],
      complete: function() {
        let introBtn = document.querySelector(".btn-intro");
        introBtn.parentNode.removeChild(introBtn);
        anime({
          targets: ".cb-instructions",
          opacity: [0,1],
          easing: "easeInOutQuad",
          duration: 300
        });
      }
    }) 
    .add({
      targets: [".btn-cb"],
      opacity: [0,1],
      translateY: [20, 0],
      delay: anime.stagger(100),
      easing: "spring",
      begin: function() {
        btns.forEach(btn => btn.style.zIndex = 10);
      }
    });
  });

  //button click events handlers
  btns.forEach (btn => btn.addEventListener("click", e => {
    let btn = e.currentTarget;
    let btnTxt = btn.textContent.toLowerCase();
    let characterClass = character.classList;

    if (!(btnTxt === characterClass)) {
      //if the clicked button isnt the same as the active state's identifier class name

      //clear button active classes and update the clickeed button with the active class
      btns.forEach (btn => btn.classList.remove("active"));
      btn.classList.add("active");
      //update CharacterBuilder.target var to the button text's string
      target = btnTxt;

      if (tl !== undefined) {
        //if the tl  exists
        if (tl.completed === true && tl.progress === 100) {
          //if tl has fully played through

          //reverse the tl
          // tl.reverse();
          // tl.play();
          //fuck that ^^ rebuild the tl in reverse to reverse it
          createTL(current,"easeOutBack", 300,"reverse");
        }
      } else {
        //if it hasn't

        //build / play the timeline
        createTL(btnTxt, "easeInOutBack", 666,"normal");
      }
    } 
  }));

  function createTL(label, easing, duration, direction) {
    //remove any whitespace in the label
    label = label.trim();
    //target specific character layer
    let layer = "#head-"+label;
    //update class name
    character.classList.value = "";
    character.classList.add(label);
    //update CharacterBuilder.current var to the new timeline's string label
    current = label;

    //remove instructions if they exist still
    let instr = document.querySelector(".cb-instructions");
    if (instr !== null){
      instr.parentNode.removeChild(instr);
    }

    //clear the CharacterBuilder.tl obj
    tl = null;
    //create new timeline with easing, duration, and direction vars
    tl = anime.timeline({
      easing: easing,
      duration: duration,
      direction: direction,
      complete: function() {
        if (tl.reversed && tl.progress == 100) {
          // tl.reverse();
          // tl.play();
          createTL(current,"easeOutBack", 300, "reverse");
        } else if (tl.reversed && tl.progress == 0) {
          createTL(target, "easeInOutBack", 666, "normal");
        } 
      }
    });
    
    //get hairWidth for shadow width calculation
    let hair = document.querySelector(layer+" [id*='hair']");
    let hairWidth = hair.getBoundingClientRect().width;
    
    //populate the CharacterBuilder.tl obj with the appropriate transitions
    //it automatically runs the animation
    tl.add({targets: hair, opacity: [0,1], scaleY: [0,1],})
      .add({targets: "#shadow", opacity: [0,1], rx: [70,(hairWidth/2.66)]}, "-=700")
      .add({targets: layer+" [id*='face']", opacity: [0,1], scaleY: [0,1],}) 
      .add({targets: layer+" [id*='eyes']", opacity: [0,1], scaleY: [0,1],})
      .add({targets: layer+" [id*='brows'] path", opacity: [0,1], scaleY: [0,1], delay: anime.stagger(100, {easing: "easeOutQuad"}),})
      .add({targets: layer+" [id*='facial'] path", opacity: [0,1], scaleY: [0,1], delay: anime.stagger(100, {easing: "easeOutQuad"}),});
    
    if (label === "designer" || label === "thinker") {
      tl.add({targets: layer+" [id*='bun']", opacity: [0,1], translateY: [-50,0],});
    }
  }
}