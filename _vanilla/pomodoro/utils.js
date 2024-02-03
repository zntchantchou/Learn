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

/**
 * adds n ids to n elements, one id per element
 * @param {Array<HTMLElement>} elements
 * @param {Array<string>} ids
 * @returns {Array<HTMLElement>}
 */
export function addIdToElements(elements, ids) {
  if (elements.length !== ids.length) {
    console.log("Error at addIdsToElements");
  }
  elements.forEach((elt, index) => {
    elt.id = ids[index];
  });
  return elements;
}
