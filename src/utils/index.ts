import * as am5 from '@amcharts/amcharts5';

import { Data, Point } from 'types';

export const fetchData = async (url: string) => {
  try {
    const responseData = await fetch(url);

    const responseJSON = await responseData.json();

    return responseJSON;
  } catch (error) {
    console.log(error);
  }
};

export const generateAPR = (pointsCount = 30) => {
  const data = [];
  const date = new Date();
  let value = 9.1;
  for (let i = 0; i < pointsCount; ++i) {
    value = value + Math.random() * value * 0.05;
    am5.time.add(date, 'day', 1);
    data.push({
      date: date.getTime(),
      value: value,
    });
  }
  return data;
};

export const getTvl = (data: Data, asset: string) => {
  const filteredData = data.find((item) => item.asset === asset);

  if (!filteredData) return [];

  const [farm] = filteredData.selected_farm;

  const { tvlStaked } = farm;

  return farm.tvlStakedHistory.map((point: Point) => ({
    date: new Date(point.date).getTime(),
    value: tvlStaked / point.value,
  }));
};
