import * as am5 from '@amcharts/amcharts5';

export class MyTheme extends am5.Theme {
  setupDefaultRules() {
    this.rule('Graphics', ['line', 'series', 'stroke']).setAll({
      strokeWidth: 3,
    });
    this.rule('LineSeries').adapters.add('stroke', () => am5.color('#C94EF1'));
    this.rule('Label').setAll({
      fontSize: 12,
      fill: am5.color('#90A3DD'),
    });
    this.rule('Grid').setAll({
      stroke: am5.color('#3D416C'),
      strokeWidth: 2,
      strokeOpacity: 0.5,
    });
  }
}

export const getFillGradient = (root: am5.Root) => {
  return am5.LinearGradient.new(root, {
    stops: [
      {
        color: am5.color('#4C3974'),
      },
      {
        color: am5.color('#365B86'),
      },
    ],
  });
};
