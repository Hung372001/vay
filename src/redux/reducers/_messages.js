const initialAuth = {
  newMessage: [],
}

export default function (state = initialAuth, action) {
  switch (action.type) {
    case 'INIT_UNREAD':
      return { ...state, newMessage: action.payload }
    case 'ADD_NEW_MESSAGE':
      return { ...state, newMessage: [...state.newMessage, action.payload] }
    case 'POP_BY_USER':
      return { ...state, newMessage: [...action.payload] }
    default:
      return { ...state }
  }
}
