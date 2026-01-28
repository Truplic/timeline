import uPlot, { type Options } from "uplot";
import { timelinePlugin, wheelZoomPlugin } from "./plugins";
import "uplot/dist/uPlot.min.css";
import "./timeline.css";

const makeChart = (
  options: {
    title: string;
    time: boolean;
    mode: 1 | 2 | 3;
    stateLabels: Record<number, string>;
    fill: (seriesIdx: number, dataIdx: number, value: number) => string;
    stroke: (seriesIdx: number, dataIdx: number, value: number) => string;
  },
  data: uPlot.AlignedData,
) => {
  const plotOptions: Options = {
    width: 1200,
    height: 300,
    title: options.title ?? "Timeline",
    // drawOrder: ["series", "axes"],
    scales: {
      x: {
        time: options.time ?? true,
      },
    },
    axes: [
      {
        values: (u, splits) => splits.map((v) => v + "µs"), // enable for units in time labels
      },
      {},
    ],
    legend: {
      //	live: false,
      markers: {
        width: 0,
      },
    },
    padding: [null, 0, null, 0],
    series: [
      {
        label: "Time (µs)",
      },
      {
        label: "Sigout 1",
        fill: "#1e638c",
        stroke: "#1e638c",
        width: 4,
        value: (u, v) => v,
      },
      {
        label: "Sigout 2",
        fill: "#1e638c",
        stroke: "#1e638c",
        width: 4,
        value: (u, v) => v,
      },
      {
        label: "Sigout 3",
        fill: "#1e638c",
        stroke: "#1e638c",
        width: 4,
        value: (u, v) => v,
      },
      {
        label: "Sigout 4",
        fill: "#1e638c",
        stroke: "#1e638c",
        width: 4,
        value: (u, v) => v,
      },
    ],
    plugins: [
      timelinePlugin({
        count: data.length - 1,
        ...options,
      }),
      wheelZoomPlugin(),
    ],
  };

  new uPlot(plotOptions, data, document.body);
};

const statesDisplay = [
  {},
  {
    0: { stroke: "#C9D1D3", fill: "#C9D1D3" },
    1: { stroke: "#009EE0", fill: "#009EE0" },
    2: { stroke: "#009EE0", fill: "#009EE0" },
  },
  {
    0: { stroke: "#C9D1D3", fill: "#C9D1D3" },
    1: { stroke: "#009EE0", fill: "#009EE0" },
    2: { stroke: "#009EE0", fill: "#009EE0" },
    3: { stroke: "#009EE0", fill: "#009EE0" },
  },
  {
    0: { stroke: "#C9D1D3", fill: "#C9D1D3" },
    1: { stroke: "#009EE0", fill: "#009EE0" },
    2: { stroke: "#009EE0", fill: "#009EE0" },
    3: { stroke: "#009EE0", fill: "#009EE0" },
    4: { stroke: "#009EE0", fill: "#009EE0" },
  },
  {
    0: { stroke: "#C9D1D3", fill: "#C9D1D3" },
    1: { stroke: "#009EE0", fill: "#009EE0" },
    2: { stroke: "#009EE0", fill: "#009EE0" },
    3: { stroke: "#009EE0", fill: "#009EE0" },
    4: { stroke: "#009EE0", fill: "#009EE0" },
  },
];

const stateLabels = {
  0: "",
  1: "WF 1",
  2: "WF 2",
  3: "WF 3",
  4: "WF 4",
};

const frames = [
  [
    new Uint16Array([10, 15, 20, 44, 67, 77]), // time in us
    new Uint16Array([1, 2, 0, 1, 0, 1]), // state / type
  ],
  [new Uint16Array([2, 10, 21, 30]), new Float64Array([3, 0, 2, 0])],
  [
    new Uint16Array([1, 7, 12, 23, 41, 100]),
    new Float64Array([0, 1, 0, 4, 0, 2]),
  ],
  [new Uint16Array([30, 60, 90, 120, 141]), new Float64Array([0, 1, 2, 3, 4])],
];

const data = uPlot.join(frames); // This is memory intensive way to alig align data. Better way is to do it manually

makeChart(
  {
    title: "Timeline",
    mode: 1,
    time: false,
    stateLabels,
    fill: (seriesIdx, dataIdx, value) => statesDisplay[seriesIdx][value].fill,
    stroke: (seriesIdx, dataIdx, value) =>
      statesDisplay[seriesIdx][value].stroke,
  },
  data,
);
