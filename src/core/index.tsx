import React, { FC, useEffect } from 'react';

import { Data } from 'types';
import { createChart } from 'utils/chart';
import { fetchData, generateAPR, getTvl } from 'utils';

import css from './index.module.css';

const dataURL =
  'https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000';

const Core: FC = () => {
  useEffect(() => {
    fetchData(dataURL).then(({ data }) => {
      const tvlData = getTvl(data as Data, 'Hackerdao-WBNB');
      console.log(tvlData);

      createChart({ id: 'tvl-chart', data: tvlData, titleText: 'Asset TVL' });
    });
  }, []);

  useEffect(() => {
    const aprData = generateAPR();

    createChart({ id: 'apr-chart', data: aprData, titleText: 'Asset APR (y)', yNumberFormatting: "#.00'%'" });
  }, []);

  return (
    <section className={css.layout}>
      <div className={css.chart} id="apr-chart" />
      <div className={css.chart} id="tvl-chart" />
    </section>
  );
};

export default Core;
