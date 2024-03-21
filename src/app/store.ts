import { configureStore } from "@reduxjs/toolkit";
import pointModalReducer from "@/components/PointModal/PointModalSlice";
import boardReducer from "@/components/Board/BoardSlice";

export const store = configureStore({
  reducer: {
    pointModal: pointModalReducer,
    board: boardReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
