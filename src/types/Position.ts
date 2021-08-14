export class Position {
  constructor(private latitude: number, private longitude: number) {}

  static degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  calculateDistance(other: Position): number {
    const earthRadiusKm = 6371;

    const dLat = Position.degreesToRadians(other.latitude - this.latitude);
    const dLon = Position.degreesToRadians(other.longitude - this.longitude);

    const lat1 = Position.degreesToRadians(this.latitude);
    const lat2 = Position.degreesToRadians(other.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Returns the distance in meters
    return Math.floor(earthRadiusKm * c);
  }

  toString(): string {
    return this.latitude + ", " + this.longitude;
  }

  getLongitude(): number {
    return this.longitude;
  }

  getLatitude(): number {
    return this.latitude;
  }
}
