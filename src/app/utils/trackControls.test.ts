import { getNextTrack, getPrevTrack } from './trackControls';
import { TrackType } from '../sharedTypes/sharedTypes';

const mockTracks: TrackType[] = [
  { _id: 1, name: 'Track 1' } as TrackType,
  { _id: 2, name: 'Track 2' } as TrackType,
  { _id: 3, name: 'Track 3' } as TrackType,
];

describe('trackControls', () => {
  describe('getNextTrack', () => {
    test('следующий трек в обычном режиме', () => {
      const result = getNextTrack(mockTracks[0], mockTracks, false, []);
      expect(result.nextTrack?._id).toBe(2);
      expect(result.nextIndex).toBe(1);
      expect(result.shouldPlay).toBe(true);
    });

    test('в конце плейлиста в обычном режиме', () => {
      const result = getNextTrack(mockTracks[2], mockTracks, false, []);
      expect(result.nextTrack).toBeNull();
      expect(result.nextIndex).toBe(-1);
      expect(result.shouldPlay).toBe(false);
    });

    test('в режиме shuffle циклически', () => {
      const result = getNextTrack(mockTracks[2], mockTracks, true, mockTracks);
      expect(result.nextTrack?._id).toBe(1);
      expect(result.nextIndex).toBe(0);
      expect(result.shouldPlay).toBe(true);
    });
  });

  describe('getPrevTrack', () => {
    test('предыдущий трек в обычном режиме', () => {
      const result = getPrevTrack(mockTracks[1], mockTracks, false, []);
      expect(result.nextTrack?._id).toBe(1);
      expect(result.nextIndex).toBe(0);
      expect(result.shouldPlay).toBe(true);
    });

    test('в начале плейлиста в обычном режиме остается на месте', () => {
      const result = getPrevTrack(mockTracks[0], mockTracks, false, []);
      expect(result.nextTrack?._id).toBe(1);
      expect(result.nextIndex).toBe(0);
      expect(result.shouldPlay).toBe(true);
    });

    test('в режиме shuffle циклически', () => {
      const result = getPrevTrack(mockTracks[0], mockTracks, true, mockTracks);
      expect(result.nextTrack?._id).toBe(3);
      expect(result.nextIndex).toBe(2);
      expect(result.shouldPlay).toBe(true);
    });

    test('если трек не найден, возвращает null', () => {
      const result = getPrevTrack(null, mockTracks, false, []);
      expect(result.nextTrack).toBeNull();
      expect(result.nextIndex).toBe(-1);
      expect(result.shouldPlay).toBe(false);
    });
  });
});
