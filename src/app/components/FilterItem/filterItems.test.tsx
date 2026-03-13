import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterItems from './FilterItems';
import ReduxProvider from '@/app/store/ReduxProvider';

describe('FilterItems', () => {
  const mockChangeFilter = jest.fn();
  const mockOnSelect = jest.fn();

  const defaultProps = {
    activeFilter: null,
    changeActiveFilter: mockChangeFilter,
    nameFilter: 'author',
    list: ['Artist 1', 'Artist 2'],
    titleFilter: 'исполнителю',
    onSelect: mockOnSelect,
  };

  test('показывает название фильтра', () => {
    render(
      <ReduxProvider>
        <FilterItems {...defaultProps} />
      </ReduxProvider>,
    );
    expect(screen.getByText('исполнителю')).toBeInTheDocument();
  });

  test('открывает список когда activeFilter совпадает', () => {
    render(
      <ReduxProvider>
        <FilterItems {...defaultProps} activeFilter="author" />
      </ReduxProvider>,
    );
    expect(screen.getByText('Artist 1')).toBeInTheDocument();
  });

  test('закрывает список когда activeFilter не совпадает', () => {
    render(
      <ReduxProvider>
        <FilterItems {...defaultProps} activeFilter="other" />
      </ReduxProvider>,
    );
    expect(screen.queryByText('Artist 1')).not.toBeInTheDocument();
  });

  test('вызывает changeActiveFilter при клике на кнопку', () => {
    render(
      <ReduxProvider>
        <FilterItems {...defaultProps} />
      </ReduxProvider>,
    );
    fireEvent.click(screen.getByText('исполнителю'));
    expect(mockChangeFilter).toHaveBeenCalledWith('author');
  });

  test('вызывает onSelect при клике на элемент', () => {
    render(
      <ReduxProvider>
        <FilterItems {...defaultProps} activeFilter="author" />
      </ReduxProvider>,
    );
    fireEvent.click(screen.getByText('Artist 1'));
    expect(mockOnSelect).toHaveBeenCalledWith('Artist 1');
  });
});
