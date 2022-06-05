/* eslint-disable @typescript-eslint/no-explicit-any */
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';

import { MyTheme, getFillGradient } from './theming';

interface CreateChart {
  id: string;
  titleText: string;
  yNumberFormatting?: string;
  data: any[];
}

export function createChart({ id, data, titleText, yNumberFormatting }: CreateChart) {
  const root = am5.Root.new(id);

  root.setThemes([MyTheme.new(root)]);

  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: 'none',
      wheelY: 'none',
      pinchZoomX: true,
      layout: root.verticalLayout,
    })
  );
  chart.gridContainer.toFront();
  chart.seriesContainer.toFront();
  chart.plotContainer.get('background')?.setAll({
    stroke: am5.color('#3D416C'),
    strokeWidth: 2,
    strokeOpacity: 0.5,
  });

  const xAxis = chart.xAxes.push(
    am5xy.DateAxis.new(root, {
      baseInterval: {
        timeUnit: 'day',
        count: 1,
      },
      startLocation: 0.5,
      endLocation: 0.5,
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {}),
    })
  );

  const xRenderer = xAxis.get('renderer');
  xRenderer.labels.template.setAll({
    paddingTop: 10,
  });

  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      numberFormat: yNumberFormatting,
      renderer: am5xy.AxisRendererY.new(root, {}),
    })
  );

  const yRenderer = yAxis.get('renderer');
  yRenderer.labels.template.setAll({
    paddingRight: 10,
  });

  const series = chart.series.push(
    am5xy.SmoothedXLineSeries.new(root, {
      name: 'Series',
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: 'value',
      valueXField: 'date',
    })
  );

  series.fills.template.setAll({
    visible: true,
    fillGradient: getFillGradient(root),
    fillOpacity: 0.5,
  });

  chart.children.unshift(
    am5.Label.new(root, {
      text: titleText,
      fontSize: 25,
      fill: am5.Color.fromString('#FDF7E1'),
      fontWeight: '500',
      textAlign: 'center',
      x: am5.percent(50),
      centerX: am5.percent(50),
      paddingTop: 0,
      paddingBottom: 20,
    })
  );

  series.data.setAll(data);
}
