import React, { FC, useEffect } from 'react';

import { Data } from 'types';
import { createChart } from 'utils/chart';
import { fetchData, getTvl } from 'utils';

import css from './index.module.css';

const dataURL =
  'https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000';

const TvlChart: FC = () => {
  useEffect(() => {
    fetchData(dataURL).then(({ data }) => {
      const tvlData = getTvl(data as Data, 'Hackerdao-WBNB');

      createChart({ id: 'tvl-chart', data: tvlData, titleText: 'Asset TVL' });
    });
  }, []);

  return <div className={css.chart} id="tvl-chart" />;
};

export default TvlChart;
