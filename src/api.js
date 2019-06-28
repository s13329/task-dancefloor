export const getData = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    rows: 2,
    columns: 10
  };
};
