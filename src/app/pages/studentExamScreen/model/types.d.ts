export declare type ModelType = 'CLM' | 'TFJS';
export declare interface Vector2D {
  y: number;
  x: number;
}
export declare interface FacePosition {
  nose: Vector2D,
  leftEye: Vector2D,
  rightEye: Vector2D,
  leftEar: Vector2D,
  rightEar: Vector2D,
}
export declare interface FaceScale {
  nose: number,
  leftEye: number,
  rightEye: number,
  leftEar: number,
  rightEar: number,
}
