(()=> {
    console.log("IIFE Called");

    const canvas = document.querySelector("#explode-view");
    const context = canvas.getContext("2d");

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

})();