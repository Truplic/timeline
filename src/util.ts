/**
 * Generates a frames structure with TypedArrays.
 * @param {number} numFrames - Number of frame pairs to generate.
 * @param {number} minLen - Minimum length of the arrays.
 * @param {number} maxLen - Maximum length of the arrays.
 * @param {number} maxTimeValue - The upper bound for the time values.
 */
export const generateFrames = (
  numFrames = 4,
  minLen = 500000,
  maxLen = 1000000,
  maxTimeValue = 65535,
) => {
  console.time("generateFrames");
  const frames = [];

  for (let i = 0; i < numFrames; i++) {
    // Determine random length for this specific frame
    const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;

    // 1. Generate First Array (Time in us)
    // Using Uint32Array if maxTimeValue > 65535, otherwise Uint16Array per your example
    const timeArray = new Uint32Array(length);
    for (let j = 0; j < length; j++) {
      timeArray[j] = Math.floor(Math.random() * (maxTimeValue + 1));
    }
    // Sort to meet "sorted" requirement (TypedArray sort is numeric by default)
    timeArray.sort();

    // 2. Generate Second Array (State / Type)
    // Your example used Uint16Array for the first frame and Float64Array for others.
    // I'll use Float64Array as the default for the second pair to match your snippet's majority.
    const stateArray = new Float64Array(length);
    for (let j = 0; j < length; j++) {
      stateArray[j] = Math.floor(Math.random() * 5); // Random 0 to 4
    }

    frames.push([timeArray, stateArray]);
  }
  console.timeEnd("generateFrames");

  return frames;
};
