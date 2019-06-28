import React, { useReducer, useEffect } from 'react';
import styled from 'styled-jss';
import { Formik, Form, Field } from 'formik';
import { Stage, Layer, Rect } from 'react-konva';
import Konva from 'konva';

import { getData } from './api';

const Container = styled('div')({
  width: '800px'
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, ...action.payload, isLoading: false };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    columns: '',
    rows: '',
    isLoading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: result
      });
    };
    fetchData();
  }, []);

  const handleSubmit = values => {
    dispatch({
      type: 'FETCH_SUCCESS',
      payload: values
    });
  };

  console.log('state :', state);

  if (state.isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <Container>
      <Formik
        onSubmit={handleSubmit}
        enableReinitialize
        initialValues={{
          rows: state.rows,
          columns: state.columns
        }}
      >
        {() => (
          <Form>
            <Field type="text" name="columns" />
            <Field type="text" name="rows" />
            <button type="submit">Generate</button>
          </Form>
        )}
      </Formik>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {[...Array(+state.rows)].map((row, i) =>
            [...Array(+state.columns)].map((column, j) => (
              <Rect
                x={100 * j}
                y={100 * i}
                width={100}
                height={100}
                fill={Konva.Util.getRandomColor()}
              />
            ))
          )}
        </Layer>
      </Stage>
    </Container>
  );
};

/*  {[...Array(state.rows)].map((row, i) =>
            [...Array(state.columns)].map((column, j) => (
              <Rect x={20 * (j + 1)} y={20 * (i + 1)} width={50} height={50} />
            ))
          )} */

export default App;
