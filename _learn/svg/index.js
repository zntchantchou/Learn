const progressCircleElt = document.getElementById("circle-progress");
console.log("progressCircleElt", progressCircleElt);
const currentOffset = progressCircleElt.style.strokeDashoffset;
const CIRCLE_RADIUS = 45;
const circumference = 2 * CIRCLE_RADIUS * Math.PI;
const tickOffset = circumference / 100;

setInterval(() => {
  console.log("interval");
  let currentOffset = progressCircleElt.style.strokeDashoffset;
  progressCircleElt.style.strokeDashoffset = currentOffset - tickOffset;
}, 1000);
console.log(
  "current strokeDashOffset ",
  progressCircleElt.style.strokeDashoffset
);
