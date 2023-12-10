export const initialState = undefined;

export const reducer = (username, action) => {
  if (action.type === "USER") {
    return action.payload;
  }

  return username;
};
