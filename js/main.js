(() => {
  const menu = document.querySelector("#menu");
  const hamburger = document.querySelector("#hamburger");
  const closebutton = document.querySelector("#close");
  const menuLinks = document.querySelectorAll("#menu nav ul li a");

  function toggleMenu() {
      menu.classList.toggle("open");
  }

  closebutton.addEventListener("click", toggleMenu);
  hamburger.addEventListener("click", toggleMenu);
  menuLinks.forEach(link => link.addEventListener("click", toggleMenu));

  const canvas = document.querySelector("#explode-view");
  const context = canvas.getContext("2d");

  const frameCount = 236;
  const images = [];
  const buds = { frame: 0 };

  canvas.width = 1920;
  canvas.height = 1080;

  for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `images/cosmic_earbuds${(i + 1).toString().padStart(3, '0')}.webp`;
      images.push(img);
  }

  function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[buds.frame], 0, 0);
  }

  gsap.to(buds, {
      frame: frameCount - 1,
      snap: "frame",
      scrollTrigger: {
          trigger: "#explode-view",
          pin: true,
          scrub: 1,
          start: "top top",
          markers: true
      },
      onUpdate: render
  });

  images[0].addEventListener("load", render);

  const divisor = document.querySelector("#divisor");
  const slider = document.querySelector("#slider");

  function moveDivisor() {
      divisor.style.width = `${slider.value}%`;
  }

  function resetSlider() {
      slider.value = 50;
      moveDivisor();
  }

  slider.addEventListener("input", moveDivisor);
  window.addEventListener("load", resetSlider);

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
  ];

  function loadInfo() {
      infoBoxes.forEach((infoBox, index) => {
          const selected = document.querySelector(`#hotspot-${index + 1}`);
          const img = document.createElement('img');
          img.src = infoBox.image;

          const title = document.createElement('h2');
          title.textContent = infoBox.title;

          const text = document.createElement('p');
          text.textContent = infoBox.text;

          selected.appendChild(title);
          selected.appendChild(text);
          selected.appendChild(img);
      });
  }
  loadInfo();

  function showInfo() {
      const selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, { duration: 1, autoAlpha: 1 });
  }

  function hideInfo() {
      const selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, { duration: 1, autoAlpha: 0 });
  }

  hotspots.forEach(hotspot => {
      hotspot.addEventListener("mouseenter", showInfo);
      hotspot.addEventListener("mouseleave", hideInfo);
  });

  const earbuds = document.querySelector("#ear-buds");
  const buttons = document.querySelectorAll("#color-con button");

  function swapColor(e) {
      earbuds.src = `images/earbuds-${e.currentTarget.id}.png`;
  }

  buttons.forEach(button => button.addEventListener("click", swapColor));

  const colorButtons = document.querySelectorAll("#color-con button");
  const colorLabel = document.querySelector("#color-label");

  colorButtons.forEach(btn => {
      btn.addEventListener("click", () => {
          const selectedColor = btn.getAttribute("data-color");
          colorLabel.textContent = selectedColor;

          colorLabel.classList.add("show");

          setTimeout(() => colorLabel.classList.remove("show"), 2000);
      });
  });

})();

