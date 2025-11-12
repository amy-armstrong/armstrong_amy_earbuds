(()=> {
    console.log("IIFE Called");

    const canvas = document.querySelector("#explode-view");
    const context = canvas.getContext("2d");

    const hotspots = document.querySelectorAll(".Hotspot");

    const infoBoxes = [
        {
          image: "images/white_cloud.png",
          title: "Noise-cancelling",
          text: "Reduces external noise for immersive listening."
        },
        {
          image: "images/white_cloud.png",
          title: "Touch Controls",
          text: "Play/pause, skip tracks, answer calls, volume adjustments with taps or swipes."
        },
        {
          image: "images/white_cloud.png",
          title: "Lightweight & Compact",
          text: "Comfortable for long wear."
        },
        {
          image: "images/white_cloud.png",
          title: "Sweat & Water Resistance",
          text: "IPX4/IPX7 for workouts and outdoor use."
        }
      ]

    canvas.width= 1920;
    canvas.height = 1080;

    //How many still frames do we have, you will need to adjust this
    const frameCount = 450; 

    //array to hold our images
    const images = [];

    //object will hold the current frame
    //we will use GreenSock to animate the frame property
    const buds = {
        frame: 0
    }

    const divisor = document.querySelector("#divisor");
    const slider = document.querySelector("#slider");


    //Run a for loop to populate images array
    for (let i=0; i<frameCount; i++) {
        const img = new Image();
        img.src = `images/explode_${(i+1).toString().padStart(4, '0')}.webp`;
        images.push(img);
    }
    console.log(images);

    gsap.to(buds, {
        frame: 449,
        snap: "frame",
        scrollTrigger: {
            trigger: "#explode-view",
            pin: true,
            scrub: 1,
            start: "top top",
            markers: true
        },
        onUpdate: render
    })

    images[0].addEventListener("load", render);
    slider.addEventListener("input", moveDivisor);
    window.addEventListener("load", resetSlider);
    hotspots.forEach(function (hotspot) {
        hotspot.addEventListener("mouseenter", showInfo);
        hotspot.addEventListener("mouseleave", hideInfo);
      });

    function render() {
        //console.log(buds.frame);
        //console.log(images[buds.frame]);
        context.clearRect(0,0, canvas.width, canvas.height);
        context.drawImage(images[buds.frame], 0, 0);
    }

    function moveDivisor() {
        // console.log(slider.value);
        divisor.style.width = `${slider.value}%`;
    }

    function resetSlider() {
        slider.value = 50;
    }

    function loadInfo() {
        infoBoxes.forEach((infoBox, index)=>{
          // console.log(index+1);
          //selected will be the inforBox on our page, e.g.hotspot-1, hotspot-2, etc.
          let selected = document.querySelector(`#hotspot-${index+1}`);
          console.log(selected);
    
          //lets create an img
          const imageElement = document.createElement('img');
          //lets populate the img
          imageElement.src = infoBox.image;
    
          //lets create an h2
          const titleElement = document.createElement('h2');
          //lets populate the h2
          titleElement.textContent = infoBox.title;
    
          //lets create a p
          const textElement = document.createElement('p');
          //lets populate the p
          textElement.textContent = infoBox.text;
    
  
          //lets add the h2 to the selected hotspot
          selected.appendChild(titleElement);
          //lets add the p to the selected hotspot
          selected.appendChild(textElement);
          //lets add the img to the selected hotspot
          selected.appendChild(imageElement);
    
        });
      }
      loadInfo();
  
      function showInfo() {
       //console.log(this.slot);
       //console.log(`#${this.slot}`);
       //since the slot value matches the id value I can use the slot value as a selector to get to the div I want.
       let selected = document.querySelector(`#${this.slot}`);
       gsap.to(selected, { duration: 1, autoAlpha: 1 });
     }
   
     function hideInfo() {
       //console.log(this.slot);
       //console.log(`#${this.slot}`);
       let selected = document.querySelector(`#${this.slot}`);
       gsap.to(selected, { duration: 1, autoAlpha: 0 });
     }

})();