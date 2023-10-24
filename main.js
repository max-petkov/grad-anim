const gradient = new Gradient();
gradient.initGradient("canvas");

// Controls
const gui = new dat.GUI();
const colorFolder = gui.addFolder('Colors');
const noiseFrequencyFolder = gui.addFolder('Noise Frequency'); 
colorFolder.open();
noiseFrequencyFolder.open();
const palette = {
  colorOne: "#c3e4ff",
  colorTwo: "#6ec3f4",
  colorThree: "#eae2ff",
  colorFour: "#b9beff",
}
const additional = {
  noiseSpeed: 10,
  noiseFlow: 1,
}
const noiseFrequency = {
  valOne: 3,
  valTwo: 4,
}
colorFolder.addColor(palette, "colorOne").onChange((color) => gradient.updateBaseColor("0x" + color.split("#").join("")));
colorFolder.addColor(palette, "colorTwo").onChange((color) => gradient.updateColor(0, "0x" + color.split("#").join("")));
colorFolder.addColor(palette, "colorThree").onChange((color) => gradient.updateColor(1, "0x" + color.split("#").join("")));
colorFolder.addColor(palette, "colorFour").onChange((color) => gradient.updateColor(2, "0x" + color.split("#").join("")));

gui.add(additional,"noiseSpeed", 0, 100, 0.1).name("Noise Speed").onChange((num) => gradient.updateNoiseSpeed(num));
gui.add(additional,"noiseFlow", 0, 100, 0.1).name("Noise Flow").onChange((num) => gradient.updateNoiseFlow(num));

noiseFrequencyFolder.add(noiseFrequency, "valOne", 0, 100, 0.01).name("Value 1").onChange((num) => gradient.updateNoiseFreq([num, noiseFrequency.valTwo]));
noiseFrequencyFolder.add(noiseFrequency, "valTwo", 0, 100, 0.01).name("Value 2").onChange((num) => gradient.updateNoiseFreq([noiseFrequency.valOne, num]));




// window.onclick = function () {

//   changeSpeed({
//     start: 10,
//     end: 10.3
//   })


//     changeColor(0, {
//         start: "#c3e4ff",
//         end: "#043D5D",
//         base: true,
//     });
//     changeColor(0, {
//         start: "#6ec3f4",
//         end: "#032E46",
//     });
//     changeColor(1, {
//         start: "#eae2ff",
//         end: "#23B684"
//     });
//     changeColor(2, {
//         start: "#b9beff",
//         end: "#0F595E"
//     });
// };

function changeSpeed(config) {
  const obj = {};

  gsap.fromTo(
    obj,
    {
      x: config.start,
    },
    {
      x: config.end,
      ease: Power3.easeOut,
      duration: 10,
      yoyo: true,
      onUpdate: function () {
        gradient.updateNoiseSpeed(obj.x)
      },
    }
  );
}

function changeColor(colorNumber = null, config) {
  const obj = {};

  gsap.fromTo(
    obj,
    {
      color: config.start,
    },
    {
      color: config.end,
      ease: Power4.easeInOut,
      duration: 1.5,
      yoyo: true,
      onUpdate: function () {
        if (obj.color[0] === "#") return;
        const color = obj.color.split(",");
        const r = color[0].split("rgba(").join("").trim();
        const g = color[1].trim();
        const b = color[2].trim();

        const hex = rgbToHex(r, g, b);

        if(config.base) gradient.updateBaseColor(hex);
        else gradient.updateColor(colorNumber, hex);
      },
    }
  );
}

function rgbToHex(r, g, b) {
  return "0x" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}