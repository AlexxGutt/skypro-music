import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ReduxProvider from '@/app/store/ReduxProvider';
import Filter from './Filter';
import { data } from '@/app/data';

const mockDispatch = jest.fn();
jest.mock('@/app/store/store', () => ({
  ...jest.requireActual('@/app/store/store'),
  useAppDispatch: () => mockDispatch,
}));

describe('Filter компонент', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('компонент рендерится', () => {
    render(
      <ReduxProvider>
        <Filter tracks={data} />
      </ReduxProvider>,
    );
    expect(screen.getByText('Искать по:')).toBeInTheDocument();
  });

  test('отображает все три кнопки фильтров', () => {
    render(
      <ReduxProvider>
        <Filter tracks={data} />
      </ReduxProvider>,
    );

    expect(screen.getByText('исполнителю')).toBeInTheDocument();
    expect(screen.getByText('году выпуска')).toBeInTheDocument();
    expect(screen.getByText('жанру')).toBeInTheDocument();
  });

  test('открывается список исполнителей при клике', () => {
    render(
      <ReduxProvider>
        <Filter tracks={data} />
      </ReduxProvider>,
    );

    const authorButton = screen.getByText('исполнителю');
    fireEvent.click(authorButton);

    const firstAuthor = data[0].author;
    expect(screen.getByText(firstAuthor)).toBeInTheDocument();
  });

  test('открывается список жанров при клике', () => {
    render(
      <ReduxProvider>
        <Filter tracks={data} />
      </ReduxProvider>,
    );

    const genreButton = screen.getByText('жанру');
    fireEvent.click(genreButton);

    expect(screen.getByText('Классическая музыка')).toBeInTheDocument();
  });

  test('открывается список вариантов сортировки по годам', () => {
    render(
      <ReduxProvider>
        <Filter tracks={data} />
      </ReduxProvider>,
    );

    const yearButton = screen.getByText('году выпуска');
    fireEvent.click(yearButton);

    expect(screen.getByText('Сначала новые')).toBeInTheDocument();
    expect(screen.getByText('Сначала старые')).toBeInTheDocument();
    expect(screen.getByText('По умолчанию')).toBeInTheDocument();
  });

  test('можно выбрать исполнителя из списка', () => {
    render(
      <ReduxProvider>
        <Filter tracks={data} />
      </ReduxProvider>,
    );

    const authorButton = screen.getByText('исполнителю');
    fireEvent.click(authorButton);

    const firstAuthor = data[0].author;
    const authorItem = screen.getByText(firstAuthor);
    fireEvent.click(authorItem);

    expect(mockDispatch).toHaveBeenCalled();
  });

  test('можно выбрать жанр из списка', () => {
    render(
      <ReduxProvider>
        <Filter tracks={data} />
      </ReduxProvider>,
    );

    const genreButton = screen.getByText('жанру');
    fireEvent.click(genreButton);

    const genreItem = screen.getByText('Классическая музыка');
    fireEvent.click(genreItem);

    expect(mockDispatch).toHaveBeenCalled();
  });

  test('можно выбрать сортировку по годам', () => {
    render(
      <ReduxProvider>
        <Filter tracks={data} />
      </ReduxProvider>,
    );

    const yearButton = screen.getByText('году выпуска');
    fireEvent.click(yearButton);

    const newFirst = screen.getByText('Сначала новые');
    fireEvent.click(newFirst);

    expect(mockDispatch).toHaveBeenCalled();
  });

  test('при открытии нового фильтра, старый закрывается', () => {
    render(
      <ReduxProvider>
        <Filter tracks={data} />
      </ReduxProvider>,
    );

    const authorButton = screen.getByText('исполнителю');
    fireEvent.click(authorButton);

    const firstAuthor = data[0].author;
    expect(screen.getByText(firstAuthor)).toBeInTheDocument();

    const genreButton = screen.getByText('жанру');
    fireEvent.click(genreButton);

    expect(screen.queryByText(firstAuthor)).not.toBeInTheDocument();
    expect(screen.getByText('Классическая музыка')).toBeInTheDocument();
  });

  test('компонент рендерится без ошибок', () => {
    const { container } = render(
      <ReduxProvider>
        <Filter tracks={data} />
      </ReduxProvider>,
    );

    expect(container).toBeInTheDocument();
  });
});
