export const wheelZoomPlugin = (factor: number = 0.75) => {
  return {
    hooks: {
      ready: (u: uPlot) => {
        const xMin = u.scales.x.min;
        const xMax = u.scales.x.max;
        const yMin = u.scales.y.min;
        const yMax = u.scales.y.max;

        if (
          xMin === undefined ||
          xMax === undefined ||
          yMin === undefined ||
          yMax === undefined
        ) {
          console.warn(
            "uPlot scales are not defined. Wheel zoom plugin will not work.",
          );
          return;
        }

        const xRange = xMax - xMin;
        const yRange = yMax - yMin;

        const over = u.over;

        // Wheel scroll to zoom
        over.addEventListener(
          "wheel",
          (e) => {
            e.preventDefault();

            const { left, top } = u.cursor;
            if (left === undefined || top === undefined) {
              console.warn(
                "Cursor position is not defined. Wheel zoom plugin will not work.",
              );
              return;
            }

            const width = over.offsetWidth; // cheaper alternative to getBoundingClientRect
            const height = over.offsetHeight;

            const leftPct = left / width;
            const btmPct = 1 - top / height;

            const scaleAxis = e.shiftKey ? "y" : "x";
            if (scaleAxis === "x") {
              const xVal = u.posToVal(left, "x");
              const oxRange = (u.scales.x.max ?? 0) - (u.scales.x.min ?? 0);

              const nxRange =
                e.deltaY < 0 ? oxRange * factor : oxRange / factor;
              let nxMin = xVal - leftPct * nxRange;
              let nxMax = nxMin + nxRange;
              [nxMin, nxMax] = clamp(nxRange, nxMin, nxMax, xRange, xMin, xMax);

              u.setScale("x", {
                min: nxMin,
                max: nxMax,
              });
            } else {
              const yVal = u.posToVal(top, "y");
              const oyRange = (u.scales.y.max ?? 0) - (u.scales.y.min ?? 0);

              const nyRange =
                e.deltaY < 0 ? oyRange * factor : oyRange / factor;
              let nyMin = yVal - btmPct * nyRange;
              let nyMax = nyMin + nyRange;
              [nyMin, nyMax] = clamp(nyRange, nyMin, nyMax, yRange, yMin, yMax);

              u.setScale("y", {
                min: nyMin,
                max: nyMax,
              });
            }
          },
          // {
          //   passive: false,
          // },
        );
      },
    },
  };
};

const clamp = (
  nRange: number,
  nMin: number,
  nMax: number,
  fRange: number,
  fMin: number,
  fMax: number,
) => {
  if (nRange > fRange) {
    nMin = fMin;
    nMax = fMax;
  } else if (nMin < fMin) {
    nMin = fMin;
    nMax = fMin + nRange;
  } else if (nMax > fMax) {
    nMax = fMax;
    nMin = fMax - nRange;
  }

  return [nMin, nMax];
};
