import React, { useReducer, useEffect, useCallback } from 'react';
import styled from 'styled-jss';
import { Formik, Form, Field } from 'formik';
import { Stage, Layer, Rect } from 'react-konva';
import Konva from 'konva';
import { generate } from './utils';

import { getData } from './api';

const Container = styled('div')({
  width: '800px',
  padding: '50px'
});

const FormGrid = styled(Form)({
  display: 'grid',
  gridTemplateRows: '1fr',
  gridTemplateColumns: '2fr 2fr 1fr',
  gridColumnGap: '20px',
  height: '50px',
  marginBottom: '50px'
});

const Button = styled('button')({
  backgroundColor: 'white'
});

const Loading = styled('h1')({
  display: 'flex',
  alignItems: 'center'
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, data: action.payload };
    case 'RECT_TOGGLE':
      return {
        ...state,
        data: state.data.map(item =>
          item.id === action.payload
            ? {
                ...item,
                color: Konva.Util.getRandomColor()
              }
            : item
        )
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    data: [],
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

  const handleSubmit = useCallback(values => {
    dispatch({
      type: 'FETCH_SUCCESS',
      payload: generate(values)
    });
  }, []);

  const handleMouseEnter = useCallback(id => {
    dispatch({
      type: 'RECT_TOGGLE',
      payload: id
    });
  }, []);

  if (state.isLoading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Container>
      <Formik
        onSubmit={handleSubmit}
        enableReinitialize
        initialValues={{
          rows: '',
          columns: ''
        }}
      >
        {() => (
          <FormGrid>
            <Field
              style={{ textAlign: 'center' }}
              type="text"
              name="columns"
              placeholder="Set column quantity"
            />
            <Field
              style={{ textAlign: 'center' }}
              type="text"
              name="rows"
              placeholder="Set row quantity"
            />
            <Button type="submit">Generate</Button>
          </FormGrid>
        )}
      </Formik>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {state.data.map(item => (
            <Rect
              key={item.id}
              x={100 * item.column}
              y={100 * item.row}
              width={100}
              height={100}
              fill={item.color}
              onMouseEnter={() => handleMouseEnter(item.id)}
            />
          ))}
        </Layer>
      </Stage>
    </Container>
  );
};

export default App;
