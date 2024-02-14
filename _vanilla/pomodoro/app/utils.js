export const millisecondsToClockTime = (milliseconds) => {
  const hourInMilliseconds = 3600000;
  let hours = Math.floor(milliseconds / hourInMilliseconds);
  let millisecondsElapsed = hours > 0 ? hours * hourInMilliseconds : 0;
  let minutes = Math.floor(milliseconds - millisecondsElapsed) / 60000;
  const seconds = minutes - Math.floor(minutes);
  minutes = Math.floor(minutes);
  let secondsInSexagecimal = seconds * 0.6;
  secondsInSexagecimal = (secondsInSexagecimal * 100).toFixed(0);
  return (
    zeroPadTime(hours) +
    ":" +
    zeroPadTime(minutes) +
    ":" +
    zeroPadTime(secondsInSexagecimal)
  );
};

/**
 * @param {number} hours
 * @param {number} minutes
 * @param {number} seconds
 * @returns {number} hours * 3600000 + minutes * 60000 + seconds * 1000
 */
export function hoursMinutesSecondsToMilliseconds(hours, minutes, seconds) {
  console.log("HOURS ", hours);
  console.log("MINUTES ", minutes);
  console.log("SECONDS ", seconds);
  return hours * 3600000 + minutes * 60000 + seconds * 1000;
}

/**
 *
 * @param {number | string} time
 * @returns {string}  zero pads any number < 10
 */
export function zeroPadTime(time) {
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
 * @param {string} type type of HTMLElement to be passed to document.createElement()
 * @param {Object} [options] configuration of the html attributes
 * @param {Array<string>} options.classes css classes to be added to the element
 * @param {string} options.id css id  to be added to the element
 * @param {string} options.text text to be injected into the element
 * @returns {HTMLElement}
 */
export function createElement(type, options = {}) {
  const element = document.createElement(type);
  if (!options) return element;
  if (options && options.classes && Array.isArray(options.classes)) {
    options.classes.forEach((c) => {
      element.classList.add(c);
    });
  }
  if (options.id) {
    element.id = options.id;
  }

  if (options.text) {
    element.textContent = options.text;
  }
  return element;
}

/**
 *
 * @param {string} type type of HTMLElement to be passed to document.createElement()
 * @param {number} numberOfCopies how many copies of the element you want
 * @param {Object} [options] Options for the html attributes of all created elements
 * @param {Array<string>} options.classes css classes to be added to all elements
 * @param {string} options.text text to be injected into the element
 * @returns {Array<HTMLElement>}
 */
export function createElements(type, numberOfCopies = 2, options = {}) {
  return Array(numberOfCopies)
    .fill(null)
    .map((_) => createElement(type, options));
}

export function incrementUpTo(value, ceiling) {
  if (value < ceiling) {
    return value + 1;
  }
  return 0;
}

export function decrementFrom(value, ceiling) {
  if (value > 0) {
    console.log("value", value);
    return value - 1;
  }
  return ceiling;
}
