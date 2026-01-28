export const wheelDragPlugin = () => {
  return {
    hooks: {
      ready: (u: uPlot) => {
        const over = u.over;

        over.addEventListener("contextmenu", (e) => e.preventDefault());

        over.addEventListener("mousedown", (e) => {
          if (e.button == 1 || e.button == 2) {
            //	plot.style.cursor = "move";
            e.preventDefault();

            const left0 = e.clientX;
            //	let top0 = e.clientY;

            const scXMin0 = u.scales.x.min ?? 0;
            const scXMax0 = u.scales.x.max ?? 0;

            const xUnitsPerPx = u.posToVal(1, "x") - u.posToVal(0, "x");

            const onmove = (e: MouseEvent) => {
              e.preventDefault();

              const left1 = e.clientX;
              //	let top1 = e.clientY;

              const dx = xUnitsPerPx * (left1 - left0);

              u.setScale("x", {
                min: scXMin0 - dx,
                max: scXMax0 - dx,
              });
            };

            const onup = () => {
              document.removeEventListener("mousemove", onmove);
              document.removeEventListener("mouseup", onup);
            };

            document.addEventListener("mousemove", onmove);
            document.addEventListener("mouseup", onup);
          }
        });
      },
    },
  };
};
