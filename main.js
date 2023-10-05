const gradient = new Gradient();
const canvas = document.querySelector("canvas");

gradient.initGradient("canvas");

window.onclick = function () {
    changeColor(0, {
        start: "#c3e4ff",
        end: "#043D5D",
        base: true,
    });
    changeColor(0, {
        start: "#6ec3f4",
        end: "#032E46",
    });
    changeColor(1, {
        start: "#eae2ff",
        end: "#23B684"
    });
    changeColor(2, {
        start: "#b9beff",
        end: "#0F595E"
    });
};

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
      onComplete: function() {
        this.reverse();
      }
    }
  );
}

function rgbToHex(r, g, b) {
  return "0x" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}