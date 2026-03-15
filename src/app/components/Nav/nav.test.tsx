import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ReduxProvider from '@/app/store/ReduxProvider';
import Nav from './Nav';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock('@/app/store/store', () => ({
  ...jest.requireActual('@/app/store/store'),
  useAppDispatch: () => mockDispatch,
}));

import { useRouter } from 'next/navigation';

describe('Nav компонент', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    jest.clearAllMocks();
  });

  test('отображает логотип', () => {
    render(
      <ReduxProvider>
        <Nav />
      </ReduxProvider>,
    );

    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  test('отображает кнопку бургер-меню', () => {
    render(
      <ReduxProvider>
        <Nav />
      </ReduxProvider>,
    );

    const burger = document.querySelector('.nav__burger');
    expect(burger).toBeInTheDocument();
  });

  test('меню закрыто при загрузке', () => {
    render(
      <ReduxProvider>
        <Nav />
      </ReduxProvider>,
    );

    const menu = document.querySelector('.nav__menu');
    expect(menu).not.toHaveClass('nav__menu_on');
  });

  test('меню открывается при клике на бургер', () => {
    render(
      <ReduxProvider>
        <Nav />
      </ReduxProvider>,
    );

    const burger = document.querySelector('.nav__burger');
    fireEvent.click(burger!);

    const menu = document.querySelector('.nav__menu');
    expect(menu).toHaveClass('nav__menu_on');
  });

  test('меню закрывается при повторном клике на бургер', () => {
    render(
      <ReduxProvider>
        <Nav />
      </ReduxProvider>,
    );

    const burger = document.querySelector('.nav__burger');

    fireEvent.click(burger!);
    fireEvent.click(burger!);

    const menu = document.querySelector('.nav__menu');
    expect(menu).not.toHaveClass('nav__menu_on');
  });

  test('содержит ссылку на главную страницу', () => {
    render(
      <ReduxProvider>
        <Nav />
      </ReduxProvider>,
    );

    const mainLink = screen.getByText('Главное');
    expect(mainLink).toBeInTheDocument();
  });

  test('содержит кнопку "Войти"', () => {
    render(
      <ReduxProvider>
        <Nav />
      </ReduxProvider>,
    );

    const burger = document.querySelector('.nav__burger');
    fireEvent.click(burger!);

    const loginButton = screen.getByText('Войти');
    expect(loginButton).toBeInTheDocument();
  });

  test('клик по "Войти" вызывает router.push', () => {
    render(
      <ReduxProvider>
        <Nav />
      </ReduxProvider>,
    );

    const burger = document.querySelector('.nav__burger');
    fireEvent.click(burger!);

    const loginButton = screen.getByText('Войти');
    fireEvent.click(loginButton);

    expect(mockPush).toHaveBeenCalled();
  });

  test('компонент рендерится без ошибок', () => {
    const { container } = render(
      <ReduxProvider>
        <Nav />
      </ReduxProvider>,
    );

    expect(container).toBeInTheDocument();
  });
});
