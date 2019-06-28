import { generate } from './utils';

export const getData = async () => {
  return new Promise(resolve =>
    setTimeout(
      () =>
        resolve(
          generate({
            columns: 8,
            rows: 2
          })
        ),
      1000
    )
  );
};
