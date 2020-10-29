/**
 * Check obj is HTMLVideoElement.
 * @param obj
 */
export function isVideo(obj: HTMLVideoElement | HTMLElement): obj is HTMLVideoElement {
  return obj.tagName === 'VIDEO';
}

/**
 * Check obj is HTMLCanvasElement.
 * @param obj
 */
export function isCanvas(obj: HTMLCanvasElement | HTMLElement): obj is HTMLCanvasElement {
  return obj.tagName === 'CANVAS';
}

/**
 * Parse position data
 * @param positions
 */
function parsePosition(positions) {
  positions = {
    nose: positions[0],
    leftEye: positions[1],
    rightEye: positions[2],
    leftEar: positions[3],
    rightEar: positions[4],
  };

  // console.log(positions);
}
