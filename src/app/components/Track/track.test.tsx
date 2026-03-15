import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { data } from '@/app/data';
import ReduxProvider from '@/app/store/ReduxProvider';
import Track from './Track';
import { formatTime } from '@/app/utils/helper';

const mockTrack = data[0];
const mockTracks = data;

describe('Track компонент', () => {
  test('отображает название трека, исполнителя и время', () => {
    render(
      <ReduxProvider>
        <Track track={mockTrack} tracks={mockTracks} />
      </ReduxProvider>,
    );

    const trackNames = screen.getAllByText(mockTrack.name);
    expect(trackNames.length).toBeGreaterThan(0);

    const authors = screen.getAllByText(mockTrack.author);
    expect(authors.length).toBeGreaterThan(0);

    const formattedTime = formatTime(mockTrack.duration_in_seconds);
    const times = screen.getAllByText(formattedTime);
    expect(times.length).toBeGreaterThan(0);
  });

  test('отображает кнопку лайка', () => {
    render(
      <ReduxProvider>
        <Track track={mockTrack} tracks={mockTracks} />
      </ReduxProvider>,
    );

    const likeButton = document.querySelector('.track__timeSvg');
    expect(likeButton).toBeInTheDocument();
  });

  test('можно нажать на трек без ошибок', () => {
    render(
      <ReduxProvider>
        <Track track={mockTrack} tracks={mockTracks} />
      </ReduxProvider>,
    );

    const trackNames = screen.getAllByText(mockTrack.name);
    const firstTrackName = trackNames[0];

    expect(() => {
      fireEvent.click(firstTrackName);
    }).not.toThrow();
  });

  test('можно нажать на сердечко без ошибок', () => {
    render(
      <ReduxProvider>
        <Track track={mockTrack} tracks={mockTracks} />
      </ReduxProvider>,
    );

    const likeButton = document.querySelector('.track__timeSvg');

    expect(() => {
      fireEvent.click(likeButton!);
    }).not.toThrow();
  });

  test('исполнитель и альбом - это ссылки', () => {
    render(
      <ReduxProvider>
        <Track track={mockTrack} tracks={mockTracks} />
      </ReduxProvider>,
    );

    const authors = screen.getAllByText(mockTrack.author);
    const firstAuthor = authors[0];
    expect(firstAuthor.tagName).toBe('A');

    const albums = screen.getAllByText(mockTrack.album);
    const firstAlbum = albums[0];
    expect(firstAlbum.tagName).toBe('A');
  });

  test('компонент рендерится без ошибок', () => {
    const { container } = render(
      <ReduxProvider>
        <Track track={mockTrack} tracks={mockTracks} />
      </ReduxProvider>,
    );

    expect(container).toBeInTheDocument();
  });
});
