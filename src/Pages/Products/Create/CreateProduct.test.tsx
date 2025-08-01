import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateProduct from './CreateProduct';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Mock ProductForm to isolate CreateProduct logic
jest.mock('../../../Components/ProductForm/ProductForm', () => (props: any) => (
  <div data-testid="product-form">
    <button onClick={() => props.updateProduct({ name: 'Test Product' })}>Submit</button>
    <span>{props.formTitle}</span>
  </div>
));

const mockStore = configureStore([thunk]);
const initialState = {};
const store = mockStore(initialState);

describe('CreateProduct', () => {
  it('renders Create Product title when no id param', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/products/create']}>
          <Routes>
            <Route path="/products/create" element={<CreateProduct />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Create Product')).toBeInTheDocument();
    expect(screen.getByTestId('product-form')).toBeInTheDocument();
  });

  it('renders Edit Product title when id param is present', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/products/edit/1']}>
          <Routes>
            <Route path="/products/edit/:id" element={<CreateProduct />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Edit Product')).toBeInTheDocument();
  });

  it('dispatches createProduct on submit when no id', () => {
    store.clearActions();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/products/create']}>
          <Routes>
            <Route path="/products/create" element={<CreateProduct />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText('Submit'));
    const actions = store.getActions();
    expect(actions.length).toBeGreaterThan(0);
  });
});