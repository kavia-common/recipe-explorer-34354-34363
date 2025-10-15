export const uiInitialState = {
  theme: 'light',
  modal: { open: false, content: null, title: '' },
};

const types = {
  SET_THEME: 'ui/setTheme',
  OPEN_MODAL: 'ui/openModal',
  CLOSE_MODAL: 'ui/closeModal',
};

export function uiReducer(state = uiInitialState, action) {
  switch (action.type) {
    case types.SET_THEME: {
      const theme = action.payload === 'dark' ? 'dark' : 'light';
      try { localStorage.setItem('theme', theme); } catch {}
      return { ...state, theme };
    }
    case types.OPEN_MODAL:
      return { ...state, modal: { open: true, ...action.payload } };
    case types.CLOSE_MODAL:
      return { ...state, modal: { open: false, content: null, title: '' } };
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function uiActionsFactory(dispatch) {
  /** Returns bound action creators for UI slice. */
  return {
    // PUBLIC_INTERFACE
    setTheme: (t) => dispatch({ type: types.SET_THEME, payload: t }),
    // PUBLIC_INTERFACE
    openModal: (payload) => dispatch({ type: types.OPEN_MODAL, payload }),
    // PUBLIC_INTERFACE
    closeModal: () => dispatch({ type: types.CLOSE_MODAL }),
  };
}
