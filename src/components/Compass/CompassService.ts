import { Position } from "@/types/Position";
import { PositionService } from "./PositionService";
import { combineLatest, Observable } from "rxjs";

export class CompassService {
  positionService: PositionService;

  constructor() {
    this.positionService = new PositionService();
  }

  public getHeadingToTarget(target: Observable<Position>): Observable<number> {
    const userHeading: Observable<number> = this.positionService.getCurrentHeading();
    const userPosition: Observable<Position> = this.positionService.getLocation();
    const combinedPromises = combineLatest([userHeading, userPosition, target]);

    return new Observable<number>((observer) => {
      combinedPromises.subscribe((values) => {
        const targetHeading: number = CompassService.getAngleFromPositions(
          values[1],
          values[2]
        );
        let needleHeading = targetHeading - values[0];

        if (needleHeading < 0) needleHeading = 360 + needleHeading;
        observer.next(needleHeading);
      });
    });
  }

  private static getAngleFromPositions(
    start: Position,
    target: Position
  ): number {
    const vector: Array<number> = this.calculateVector(start, target);
    const angle: number = Math.atan2(vector[1], vector[0]);
    let degrees: number = (180 * angle) / Math.PI;
    if (degrees < 0) degrees = 360 + degrees;
    return Math.round(degrees);
  }

  private static calculateVector(
    start: Position,
    target: Position
  ): Array<number> {
    return [
      target.getLatitude() - start.getLatitude(),
      target.getLongitude() - start.getLongitude(),
    ];
  }
}
