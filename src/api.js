export const getData = async () => {
  await new Promise(resolve => setTimeout(resolve, 0));
  return {
    columns: 4,
    rows: 2
  };
};
