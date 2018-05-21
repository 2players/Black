class Projection {
  constructor() {
    this.axis = null;
    this.pointsA = null;
    this.pointsB = null;
    this.rangeA = new Range();
    this.rangeB = new Range();
    this.offset = 0;
  }

  set(pointsA, pointsB, axis) {
    this.pointsA = pointsA;
    this.pointsB = pointsB;
    this.axis = axis;
    this.refresh();
  }

  refresh() {
    Projection.project(this.pointsA, this.axis, this.rangeA);
    Projection.project(this.pointsB, this.axis, this.rangeB);
  }

  static project(points, axis, range) {
    let min = Number.MAX_VALUE;
    let max = -Number.MAX_VALUE;

    for (let i = 0, l = points.length; i < l; i++) {
      const dot = points[i].dot(axis);
      min = dot < min ? dot : min;
      max = dot > max ? dot : max;
    }

    range.min = min;
    range.max = max;
  }
}