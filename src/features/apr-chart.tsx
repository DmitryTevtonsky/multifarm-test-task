import React, { FC, useEffect } from 'react';

import { createChart } from 'utils/chart';
import { generateAPR } from 'utils';

import css from './index.module.css';

const AprChart: FC = () => {
  useEffect(() => {
    const aprData = generateAPR();

    createChart({ id: 'apr-chart', data: aprData, titleText: 'Asset APR (y)', yNumberFormatting: "#.00'%'" });
  }, []);

  return <div className={css.chart} id="apr-chart" />;
};

export default AprChart;
