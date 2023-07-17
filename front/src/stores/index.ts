import { rootSaga } from "@/stores/saga/root.saga"
import {SBOARDApi} from "@/stores/slices/api"
import { AuthApi } from "@/stores/slices/regapi"
import { UserApi } from "@/stores/slices/user.api"
import createSagaMiddleware from "@redux-saga/core"
import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const sagaMiddleWate = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    [SBOARDApi.reducerPath]: SBOARDApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        SBOARDApi.middleware,
      AuthApi.middleware,
      UserApi.middleware,
      sagaMiddleWate
    ),
})
sagaMiddleWate.run(rootSaga)
