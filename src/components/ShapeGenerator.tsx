import { Canvas, Circle, Ellipse, FabricObject, Gradient, Line, Path, Polygon, Rect, Textbox, Triangle } from "fabric";

interface ShapeOptions {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  width?: number;
  height?: number;
  left?: number;
  top?: number;
}

export class FabricShapeGenerator {
  constructor(private canvas: Canvas | null) {}

  public createText(options: ShapeOptions = {}): Textbox | undefined {
    if (!this.canvas) return;

    const defaultOptions = {
      left: 100,
      top: 100,
      width: 200,
      fontFamily: "Arial",
      fontSize: 30,
      fill: "#000000",
      padding: 10,
      borderColor: "#FFF",
    };

    const text = new Textbox("Edit This Text", { ...defaultOptions, options });

    this.canvas.add(text);
    this.canvas.setActiveObject(text);
    this.canvas.requestRenderAll();

    return text;
  }

  public createRectangle(options: ShapeOptions = {}): Rect | undefined {
    if (!this.canvas) return;

    const defaultOptions = {
      fill: "#F00",
      width: 100,
      height: 100,
      left: 50,
      top: 50,
      stroke: "#000000",
      strokeWidth: 2,
    };

    const rect = new Rect({ ...defaultOptions, ...options });

    this.canvas.add(rect);
    this.canvas.setActiveObject(rect);
    this.canvas.requestRenderAll();

    return rect;
  }

  public createCircle(options: ShapeOptions = {}): Circle | undefined {
    if (!this.canvas) return;

    const defaultOptions = {
      fill: "#00F",
      radius: 50,
      left: 50,
      top: 50,
      stroke: "#000000",
      strokeWidth: 2,
    };

    const circle = new Circle({
      ...defaultOptions,
      ...options,
    });

    this.canvas.add(circle);
    this.canvas.setActiveObject(circle);
    this.canvas.requestRenderAll();

    return circle;
  }

  public createTriangle(options: ShapeOptions = {}): Triangle | undefined {
    if (!this.canvas) return;

    const defaultOptions = {
      fill: "#1DCD9F",
      width: 100,
      height: 100,
      left: 50,
      top: 50,
      stroke: "#000000",
      strokeWidth: 2,
    };

    const triangle = new Triangle({
      ...defaultOptions,
      ...options,
    });

    this.canvas.add(triangle);
    this.canvas.setActiveObject(triangle);
    this.canvas.requestRenderAll();

    return triangle;
  }

  public createEllipse(options: ShapeOptions = {}): Ellipse | undefined {
    if (!this.canvas) return;

    const defaultOptions = {
      fill: "#A62C2C",
      rx: 50,
      ry: 30,
      left: 50,
      top: 50,
      stroke: "#000000",
      strokeWidth: 2,
    };

    const ellipse = new Ellipse({
      ...defaultOptions,
      ...options,
    });

    this.canvas.add(ellipse);
    this.canvas.setActiveObject(ellipse);
    this.canvas.requestRenderAll();

    return ellipse;
  }

  public createPolygon(points: { x: number; y: number }[], options: ShapeOptions = {}): Polygon | undefined {
    if (!this.canvas) return;

    const defaultOptions = {
      fill: "#FF9B17",
      left: 50,
      top: 50,
      stroke: "#000000",
      strokeWidth: 2,
    };

    const polygon = new Polygon(points, {
      ...defaultOptions,
      ...options,
    });

    this.canvas.add(polygon);
    this.canvas.setActiveObject(polygon);
    this.canvas.requestRenderAll();

    return polygon;
  }

  public createLine(points: [number, number, number, number], options: ShapeOptions = {}): Line | undefined {
    if (!this.canvas) return;

    const defaultOptions = {
      stroke: "#000000",
      strokeWidth: 2,
    };

    const line = new Line(points, {
      ...defaultOptions,
      ...options,
    });

    this.canvas.add(line);
    this.canvas.setActiveObject(line);
    this.canvas.requestRenderAll();

    return line;
  }

  public createStar(options: ShapeOptions & { points?: number; innerRadius?: number } = {}): Polygon | undefined {
    if (!this.canvas) return;

    const {
      points = 5,
      innerRadius = 30,
      left = 50,
      top = 50,
      fill = "#FEBA17",
      stroke = "#000000",
      strokeWidth = 2,
    } = options;

    const starPoints = this.generateStarPoints(points, 50, innerRadius);
    const star = new Polygon(starPoints, {
      left,
      top,
      fill,
      stroke,
      strokeWidth,
    });

    this.canvas.add(star);
    this.canvas.setActiveObject(star);
    this.canvas.requestRenderAll();

    return star;
  }

  public createRegularPolygon(options: ShapeOptions & { sides?: number } = {}): Polygon | undefined {
    if (!this.canvas) return;

    const { sides = 6, left = 50, top = 50, fill = "teal", stroke = "#000000", strokeWidth = 2 } = options;

    const polygonPoints = this.generateRegularPolygonPoints(sides, 50);
    const polygon = new Polygon(polygonPoints, {
      left,
      top,
      fill,
      stroke,
      strokeWidth,
    });

    this.canvas.add(polygon);
    this.canvas.setActiveObject(polygon);
    this.canvas.requestRenderAll();

    return polygon;
  }

  public createEditableCurve(): void {
    if (!this.canvas) return;

    const p0 = { x: 100, y: 300 };
    const cp = { x: 200, y: 100 };
    const p1 = { x: 300, y: 300 };

    const createPath = () => {
      const d = `M ${p0.x} ${p0.y} Q ${cp.x} ${cp.y} ${p1.x} ${p1.y}`;
      return new Path(d, {
        stroke: "#000",
        strokeWidth: 2,
        fill: "",
        selectable: false,
        evented: false,
      });
    };

    let path = createPath();
    this.canvas.add(path);

    const makeControl = (pt: typeof p0) => {
      const circle = new Circle({
        radius: 5,
        fill: "red",
        left: pt.x,
        top: pt.y,
        originX: "center",
        originY: "center",
        hasBorders: false,
        hasControls: false,
      });

      circle.on("moving", () => {
        pt.x = circle.left!;
        pt.y = circle.top!;
        this.canvas?.remove(path);
        path = createPath();
        this.canvas?.add(path);
        // this.canvas?.sendToBack(path);
      });

      this.canvas?.add(circle);
      return circle;
    };

    makeControl(p0);
    makeControl(cp);
    makeControl(p1);
  }

  public createEditablePolygon(points: { x: number; y: number }[], options: ShapeOptions = {}): Polygon | undefined {
    if (!this.canvas) return;

    const polygon = new Polygon(points, {
      fill: "#FF9B17",
      stroke: "#000",
      strokeWidth: 2,
      objectCaching: false,
      transparentCorners: false,
      ...options,
    });

    polygon.evented = true;
    polygon.hasBorders = false;

    this.canvas.add(polygon);
    this.canvas.setActiveObject(polygon);
    this.canvas.requestRenderAll();

    return polygon;
  }

  public createGradientRectangle(options: ShapeOptions = {}): Rect | undefined {
    if (!this.canvas) return;

    const rect = new Rect({
      left: 100,
      top: 100,
      width: 200,
      height: 100,
      stroke: "#000",
      strokeWidth: 2,
      ...options,
    });

    const gradient = new Gradient({
      type: "linear",
      gradientUnits: "pixels",
      coords: { x1: 0, y1: 0, x2: 200, y2: 0 },
      colorStops: [
        { offset: 0, color: "#ff0000" },
        { offset: 1, color: "#0000ff" },
      ],
    });

    rect.set("fill", gradient);
    this.canvas.add(rect);
    this.canvas.setActiveObject(rect);
    this.canvas.requestRenderAll();

    return rect;
  }

  public createAllShapes(): FabricObject[] {
    const shapes: FabricObject[] = [
      this.createRectangle({ left: 50, top: 50 })!,
      this.createCircle({ left: 200, top: 50 })!,
      this.createTriangle({ left: 350, top: 50 })!,
      this.createEllipse({ left: 50, top: 200 })!,
      this.createLine([200, 200, 350, 250])!,
      this.createPolygon(
        [
          { x: 0, y: 0 },
          { x: 50, y: 30 },
          { x: 40, y: 70 },
          { x: 10, y: 70 },
        ],
        { left: 200, top: 200 }
      )!,
      this.createStar({ left: 350, top: 200 })!,
      this.createRegularPolygon({ left: 50, top: 350, sides: 6 })!,
    ];

    return shapes;
  }

  private generateStarPoints(pointCount: number, outerRadius: number, innerRadius: number): { x: number; y: number }[] {
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < pointCount * 2; i++) {
      const angle = (i * Math.PI) / pointCount;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      points.push({
        x: radius * Math.cos(angle - Math.PI / 2),
        y: radius * Math.sin(angle - Math.PI / 2),
      });
    }
    return points;
  }

  private generateRegularPolygonPoints(sides: number, radius: number): { x: number; y: number }[] {
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides;
      points.push({
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
      });
    }
    return points;
  }
}
