import React, { FC } from 'react';

import { AprChart, TvlChart } from 'features';

import css from './index.module.css';

const Core: FC = () => {
  return (
    <section className={css.layout}>
      <AprChart />
      <TvlChart />
    </section>
  );
};

export default Core;
