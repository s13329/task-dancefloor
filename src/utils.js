import Konva from 'konva';
import uuidv4 from 'uuid/v4';

export const generate = ({ rows, columns }) => {
  let data = [];

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      data = [
        ...data,
        {
          row: i,
          column: j,
          id: uuidv4(),
          color: Konva.Util.getRandomColor()
        }
      ];
    }
  }

  return data;
};
