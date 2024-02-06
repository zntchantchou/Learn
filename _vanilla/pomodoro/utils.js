
export const millisecondsToClockTime = (milliseconds) => {
  const hourInMilliseconds = 3600000;
  let hours = Math.floor(milliseconds / hourInMilliseconds);
  let millisecondsElapsed = hours > 0 ? hours * hourInMilliseconds : 0;
  let minutes = Math.floor(milliseconds - millisecondsElapsed) / 60000;
  const seconds = minutes - Math.floor(minutes);
  minutes = Math.floor(minutes)
  let secondsInSexagecimal = seconds * 0.6;
  secondsInSexagecimal = (secondsInSexagecimal * 100).toFixed(0);
  return zeroPadTime(hours) + ":" +  zeroPadTime(minutes.toFixed(0)) + ":" + zeroPadTime(secondsInSexagecimal);
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

/**
 * 
 * @param {*} type 
 * @param {*} options 
 */
export function createElement(type, options = {}) {
  const element = document.createElement(type);
  if(options && options.classes && Array.isArray(options.classes)) {
    options.classes.forEach(c => {
      element.classList.add(c);
    })
  }
  if(options.id) {
    element.id = options.id;
  }
  return element;
}