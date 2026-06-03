import { useState, useEffect } from 'react';

import mapdata from '../../public/mapdata.json';
import { Chart as ChartJS, CategoryScale, PointElement, Tooltip } from 'chart.js';
import * as ChartGeo from 'chartjs-chart-geo';
import { BubbleMapController, GeoFeature, ColorScale, ProjectionScale, SizeScale } from 'chartjs-chart-geo';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Tooltip, ChartDataLabels, GeoFeature, ColorScale, ProjectionScale, CategoryScale, BubbleMapController, SizeScale, PointElement);

function USAChart({ chrtmapdata }) {
  let [usStates, setUSStates] = useState(null);

  const mergeStateData = (mapdata, chrtmapdata) => {
    return mapdata.map((state) => {
      return {
        ...state,
        screens: chrtmapdata.find((s) => s.url === state.sortname)?.screen || 0,
        locations: chrtmapdata.find((l) => l.url === state.sortname)?.location || 0,
      };
    });
  };
  const chartData = mergeStateData(mapdata, chrtmapdata);
  /* console.log(data) */
  if (!usStates) {
    Promise.all([fetch('https://unpkg.com/us-atlas/states-10m.json').then((r) => r.json())]).then(([us]) => {
      setUSStates(us);
    });
  }

  if (!usStates) {
    return <p>Loading..</p>;
  } else {
    return (
      <>
        <USPageMap data={chartData} usStates={usStates} />
      </>
    );
  }
}

const USPageMap = ({ data, usStates }) => {
  useEffect(() => {
    let canvas = document.getElementById('canvas');
    if (!canvas) {
      return;
    }

    let chartStatus = ChartJS.getChart('canvas'); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    const states = ChartGeo.topojson.feature(usStates, usStates.objects.states).features;

    const chart = new ChartJS(document.getElementById('canvas').getContext('2d'), {
      type: 'bubbleMap',
      data: {
        labels: data.map((d) => d.description),
        datasets: [
          {
            outline: states,
            showOutline: true,
            backgroundColor: '#D7B865',
            borderColor: '#D7B865',
            data: data.map((d) => Object.assign(d, { value: d.screens })),
            color: 'red',
            outlineBackgroundColor: '#c4d1d9',
            outlineBorderColor: '#a7afb8',
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            align: 'top',
            color: '#000000',
            labels: {
              title: {
                font: {
                  size: 14,
                },
              },
            },
            formatter: (v) => {
              return v.sortname;
            },
          },
          tooltip: {
            position: 'average',
            callbacks: {
              label: (context) => {
                /* console.log(context); */
                /* if (context.raw.name === "Arizona") {
                           return [
                              context.raw.name + ' (# Locations: ' + 35.0 + ', # Screens: ' + -117.0 + ')'
                           ];
                        } */
                /* return [
                           context.raw.name + ' (# Locations: ' + (context.raw.locations || 0) + ', # Screens: ' + (context.raw.screens || 0) + ')'
                        ]; */
                return [context.raw.name, '# Theatres: ' + (context.raw.locations ?? 'No data'), '# Screens: ' + (context.raw.screens ?? 'No data')];
              },
            },
          },
        },
        scales: {
          projection: {
            axis: 'x',
            projection: 'albersUsa',
          },
          size: {
            axis: 'x',
            size: [1, 20],
          },
        },
      },
    });
  });

  return (
    <div>
      <canvas id='canvas'></canvas>
    </div>
  );
};

export default USAChart;
