import { fabric } from "fabric";
import { Canvas, Object as FabricObject } from "fabric/fabric-impl";

interface ShapeOptions {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  width?: number;
  height?: number;
  left?: number;
  top?: number;
}

class FabricShapeGenerator {
  /**
   * Create a rectangle
   * @param canvas Fabric canvas instance
   * @param options Shape customization options
   * @returns Fabric rectangle object
   */
  static createRectangle(
    canvas: Canvas,
    options: ShapeOptions = {}
  ): fabric.Rect {
    const defaultOptions = {
      fill: "red",
      width: 100,
      height: 100,
      left: 50,
      top: 50,
      stroke: "black",
      strokeWidth: 2,
    };
    const rect = new fabric.Rect({
      ...defaultOptions,
      ...options,
    });
    canvas.add(rect);
    return rect;
  }

  /**
   * Create a circle
   * @param canvas Fabric canvas instance
   * @param options Shape customization options
   * @returns Fabric circle object
   */
  static createCircle(
    canvas: Canvas,
    options: ShapeOptions = {}
  ): fabric.Circle {
    const defaultOptions = {
      fill: "blue",
      radius: 50,
      left: 50,
      top: 50,
      stroke: "black",
      strokeWidth: 2,
    };
    const circle = new fabric.Circle({
      ...defaultOptions,
      ...options,
    });
    canvas.add(circle);
    return circle;
  }

  /**
   * Create a triangle
   * @param canvas Fabric canvas instance
   * @param options Shape customization options
   * @returns Fabric triangle object
   */
  static createTriangle(
    canvas: Canvas,
    options: ShapeOptions = {}
  ): fabric.Triangle {
    const defaultOptions = {
      fill: "green",
      width: 100,
      height: 100,
      left: 50,
      top: 50,
      stroke: "black",
      strokeWidth: 2,
    };
    const triangle = new fabric.Triangle({
      ...defaultOptions,
      ...options,
    });
    canvas.add(triangle);
    return triangle;
  }

  /**
   * Create an ellipse
   * @param canvas Fabric canvas instance
   * @param options Shape customization options
   * @returns Fabric ellipse object
   */
  static createEllipse(
    canvas: Canvas,
    options: ShapeOptions = {}
  ): fabric.Ellipse {
    const defaultOptions = {
      fill: "purple",
      rx: 50,
      ry: 30,
      left: 50,
      top: 50,
      stroke: "black",
      strokeWidth: 2,
    };
    const ellipse = new fabric.Ellipse({
      ...defaultOptions,
      ...options,
    });
    canvas.add(ellipse);
    return ellipse;
  }

  /**
   * Create a polygon
   * @param canvas Fabric canvas instance
   * @param points Array of points for the polygon
   * @param options Shape customization options
   * @returns Fabric polygon object
   */
  static createPolygon(
    canvas: Canvas,
    points: { x: number; y: number }[],
    options: ShapeOptions = {}
  ): fabric.Polygon {
    const defaultOptions = {
      fill: "orange",
      left: 50,
      top: 50,
      stroke: "black",
      strokeWidth: 2,
    };
    const polygon = new fabric.Polygon(points, {
      ...defaultOptions,
      ...options,
    });
    canvas.add(polygon);
    return polygon;
  }

  /**
   * Create a line
   * @param canvas Fabric canvas instance
   * @param points Start and end points of the line
   * @param options Shape customization options
   * @returns Fabric line object
   */
  static createLine(
    canvas: Canvas,
    points: [number, number, number, number],
    options: ShapeOptions = {}
  ): fabric.Line {
    const defaultOptions = {
      stroke: "black",
      strokeWidth: 2,
    };
    const line = new fabric.Line(points, {
      ...defaultOptions,
      ...options,
    });
    canvas.add(line);
    return line;
  }

  /**
   * Create a star polygon
   * @param canvas Fabric canvas instance
   * @param options Shape customization options
   * @returns Fabric polygon object representing a star
   */
  static createStar(
    canvas: Canvas,
    options: ShapeOptions & { points?: number; innerRadius?: number } = {}
  ): fabric.Polygon {
    const {
      points = 5,
      innerRadius = 30,
      left = 50,
      top = 50,
      fill = "yellow",
      stroke = "black",
      strokeWidth = 2,
    } = options;

    const starPoints = this.generateStarPoints(points, 50, innerRadius);
    const star = new fabric.Polygon(starPoints, {
      left,
      top,
      fill,
      stroke,
      strokeWidth,
    });
    canvas.add(star);
    return star;
  }

  /**
   * Generate points for a star polygon
   * @param pointCount Number of points in the star
   * @param outerRadius Outer radius of the star
   * @param innerRadius Inner radius of the star
   * @returns Array of points for the star polygon
   */
  private static generateStarPoints(
    pointCount: number,
    outerRadius: number,
    innerRadius: number
  ): { x: number; y: number }[] {
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

  /**
   * Create a regular polygon (hexagon, octagon, etc.)
   * @param canvas Fabric canvas instance
   * @param options Shape customization options
   * @returns Fabric polygon object
   */
  static createRegularPolygon(
    canvas: Canvas,
    options: ShapeOptions & { sides?: number } = {}
  ): fabric.Polygon {
    const {
      sides = 6,
      left = 50,
      top = 50,
      fill = "teal",
      stroke = "black",
      strokeWidth = 2,
    } = options;

    const polygonPoints = this.generateRegularPolygonPoints(sides, 50);
    const polygon = new fabric.Polygon(polygonPoints, {
      left,
      top,
      fill,
      stroke,
      strokeWidth,
    });
    canvas.add(polygon);
    return polygon;
  }

  /**
   * Generate points for a regular polygon
   * @param sides Number of sides
   * @param radius Radius of the circumscribed circle
   * @returns Array of points for the polygon
   */
  private static generateRegularPolygonPoints(
    sides: number,
    radius: number
  ): { x: number; y: number }[] {
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

  /**
   * Create all available shapes on the canvas
   * @param canvas Fabric canvas instance
   * @returns Array of created shape objects
   */
  static createAllShapes(canvas: Canvas): FabricObject[] {
    const shapes: FabricObject[] = [
      this.createRectangle(canvas, { left: 50, top: 50 }),
      this.createCircle(canvas, { left: 200, top: 50 }),
      this.createTriangle(canvas, { left: 350, top: 50 }),
      this.createEllipse(canvas, { left: 50, top: 200 }),
      this.createLine(canvas, [200, 200, 350, 250]),
      this.createPolygon(
        canvas,
        [
          { x: 0, y: 0 },
          { x: 50, y: 30 },
          { x: 40, y: 70 },
          { x: 10, y: 70 },
        ],
        { left: 200, top: 200 }
      ),
      this.createStar(canvas, { left: 350, top: 200 }),
      this.createRegularPolygon(canvas, { left: 50, top: 350, sides: 6 }),
    ];

    return shapes;
  }
}

// Example React component to demonstrate shape creation
export const ShapeGeneratorDemo: React.FC = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const newCanvas = new fabric.Canvas(canvasRef.current, {
        width: 600,
        height: 500,
        backgroundColor: "#f0f0f0",
      });
      setCanvas(newCanvas);

      return () => {
        newCanvas.dispose();
      };
    }
  }, []);

  const handleCreateAllShapes = () => {
    if (canvas) {
      FabricShapeGenerator.createAllShapes(canvas);
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} />
      <button onClick={handleCreateAllShapes}>Create All Shapes</button>
    </div>
  );
};

export default FabricShapeGenerator;
