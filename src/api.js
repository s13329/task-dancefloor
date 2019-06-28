import { generate } from './utils';

export const getData = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return generate({
    columns: 8,
    rows: 2
  });
};
