export const millisecondsToMinsAndSecs = (milliseconds) => {
  let minutes = milliseconds / 60000;
  const minutesRounded = Math.floor(minutes);
  const seconds = minutes - Math.floor(minutes);
  let secondsInSexagecimal = seconds * 0.6;
  secondsInSexagecimal = (secondsInSexagecimal * 100).toFixed(0);
  return zeroPadTime(minutesRounded) + ":" + zeroPadTime(secondsInSexagecimal);
};

function zeroPadTime(time) {
  let prefix = Number(time) < 10 ? "0" : "";
  return prefix + String(time);
}
