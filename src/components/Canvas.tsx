import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef
} from 'react';

export type CanvasHandle = {
  validate: () => boolean;
  clear: () => void;
};

type CanvasProps = {
  letter: string;
};

const Canvas = forwardRef<CanvasHandle, CanvasProps>(
  ({ letter }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawingRef = useRef(false);

    const pointsRef = useRef<
      { x: number; y: number }[]
    >([]);

    const drawGuide = () => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      ctx.save();

      ctx.font =
        'bold 210px Arial';

      ctx.textAlign = 'center';

      ctx.textBaseline = 'middle';

      ctx.fillStyle =
        'rgba(91, 33, 182, 0.12)';

      ctx.fillText(
        letter,
        canvas.width / 2,
        canvas.height / 2 + 10
      );

      ctx.restore();

      pointsRef.current = [];
    };

    useEffect(() => {
      drawGuide();
    }, [letter]);

    useImperativeHandle(ref, () => ({
      clear() {
        drawGuide();
      },

      validate() {
        const points =
          pointsRef.current;

        if (points.length < 12) {
          return false;
        }

        const canvas =
          canvasRef.current;

        if (!canvas) {
          return false;
        }

        /*
          Área central onde a letra-guia aparece.
          A criança precisa desenhar dentro dessa região.
        */

        const minX =
          canvas.width * 0.25;

        const maxX =
          canvas.width * 0.75;

        const minY =
          canvas.height * 0.08;

        const maxY =
          canvas.height * 0.92;

        const inside =
          points.filter(
            (point) =>
              point.x >= minX &&
              point.x <= maxX &&
              point.y >= minY &&
              point.y <= maxY
          );

        const percentage =
          inside.length /
          points.length;

        /*
          Pelo menos 65% do desenho deve estar
          próximo da área da letra.
        */

        return percentage >= 0.65;
      }
    }));

    useEffect(() => {
      const canvas =
        canvasRef.current;

      if (!canvas) return;

      const ctx =
        canvas.getContext('2d');

      if (!ctx) return;

      const getPosition = (
        e: PointerEvent
      ) => {
        const rect =
          canvas.getBoundingClientRect();

        return {
          x:
            (e.clientX -
              rect.left) *
            (canvas.width /
              rect.width),

          y:
            (e.clientY -
              rect.top) *
            (canvas.height /
              rect.height)
        };
      };

      const pointerDown = (
        e: PointerEvent
      ) => {
        drawingRef.current =
          true;

        const point =
          getPosition(e);

        pointsRef.current.push(
          point
        );

        ctx.beginPath();

        ctx.moveTo(
          point.x,
          point.y
        );
      };

      const pointerMove = (
        e: PointerEvent
      ) => {
        if (
          !drawingRef.current
        )
          return;

        const point =
          getPosition(e);

        pointsRef.current.push(
          point
        );

        ctx.lineWidth = 10;

        ctx.lineCap =
          'round';

        ctx.lineJoin =
          'round';

        ctx.strokeStyle =
          '#5b21b6';

        ctx.lineTo(
          point.x,
          point.y
        );

        ctx.stroke();
      };

      const pointerUp =
        () => {
          drawingRef.current =
            false;
        };

      canvas.addEventListener(
        'pointerdown',
        pointerDown
      );

      canvas.addEventListener(
        'pointermove',
        pointerMove
      );

      window.addEventListener(
        'pointerup',
        pointerUp
      );

      return () => {
        canvas.removeEventListener(
          'pointerdown',
          pointerDown
        );

        canvas.removeEventListener(
          'pointermove',
          pointerMove
        );

        window.removeEventListener(
          'pointerup',
          pointerUp
        );
      };
    }, []);

    return (
      <div>
        <canvas
          ref={canvasRef}
          width={700}
          height={280}
          className="draw"
          style={{
            touchAction: 'none'
          }}
        />

        <button
          className="soft"
          onClick={drawGuide}
        >
          🧽 Limpar
        </button>
      </div>
    );
  }
);

Canvas.displayName = 'Canvas';

export default Canvas;