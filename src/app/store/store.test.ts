import { makeStore } from './store';

describe('makeStore', () => {
  it('создает store', () => {
    const store = makeStore();
    expect(store).toBeDefined();
  });

  it('имеет правильную структуру state', () => {
    const store = makeStore();
    const state = store.getState();

    expect(state).toHaveProperty('tracks');
    expect(state).toHaveProperty('auth');
    expect(state.tracks).toHaveProperty('currentTrack');
    expect(state.auth).toHaveProperty('username');
  });

  it('создает разные экземпляры store', () => {
    const store1 = makeStore();
    const store2 = makeStore();
    expect(store1).not.toBe(store2);
  });

  it('обновляет состояние при диспатче', () => {
    const store = makeStore();

    store.dispatch({
      type: 'authSlice/setUsername',
      payload: 'test',
    });

    expect(store.getState().auth.username).toBe('test');
  });
});
