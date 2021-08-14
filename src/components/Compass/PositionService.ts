import { Position } from "@/types/Position";
import { AbsoluteOrientationSensor } from "motion-sensors-polyfill";
import { Observable } from "rxjs";

export class PositionService {
  getCurrentHeading(): Observable<number> {
    const sensor = new AbsoluteOrientationSensor({
      frequency: 60,
      referenceFrame: "screen",
    });
    const sensorObserver = new Observable<number>((observer) => {
      sensor.addEventListener("reading", () => {
        const q = sensor.quaternion;

        let alpha =
          Math.atan2(
            2 * q[0] * q[1] + 2 * q[2] * q[3],
            1 - 2 * q[1] * q[1] - 2 * q[2] * q[2]
          ) *
          (180 / Math.PI);

        if (alpha < 0) alpha = 360 + alpha;
        const degree = Math.round(360 - alpha);

        observer.next(degree);
      });
    });

    sensor.start();
    return sensorObserver;
  }

  getLocation(): Observable<Position> {
    return new Observable<Position>((observer) => {
      navigator.geolocation.watchPosition((position) => {
        observer.next(
          new Position(position.coords.latitude, position.coords.longitude)
        );
      });
    });
  }
}
