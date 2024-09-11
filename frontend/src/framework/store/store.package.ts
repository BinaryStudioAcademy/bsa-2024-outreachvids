import {
    type ThunkMiddleware,
    type Tuple,
    type UnknownAction,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { authApi } from '~/bundles/auth/auth.js';
import { reducer as authReducer } from '~/bundles/auth/store/auth.js';
import { AppEnvironment } from '~/bundles/common/enums/enums.js';
import { reducer as studioReducer } from '~/bundles/studio/store/studio.js';
import { avatarsApi, avatarVideosApi } from '~/bundles/studio/studio.js';
import { userApi } from '~/bundles/users/users.js';
import { type Config } from '~/framework/config/config.js';
import { storage } from '~/framework/storage/storage.js';

import { errorMiddleware } from '../../bundles/common/middlewares/error-handling.middleware.js';

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
    studio: ReturnType<typeof studioReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    userApi: typeof userApi;
    avatarsApi: typeof avatarsApi;
    avatarVideosApi: typeof avatarVideosApi;
    storage: typeof storage;
};

class Store {
    public instance: ReturnType<
        typeof configureStore<
            RootReducer,
            UnknownAction,
            Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>
        >
    >;

    public constructor(config: Config) {
        this.instance = configureStore({
            devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
            reducer: {
                auth: authReducer,
                studio: studioReducer,
            },
            middleware: (getDefaultMiddleware) => {
                const middlewares = getDefaultMiddleware({
                    thunk: {
                        extraArgument: this.extraArguments,
                    },
                });
                return [...middlewares, errorMiddleware] as Tuple;
            },
        });
    }

    public get extraArguments(): ExtraArguments {
        return {
            authApi,
            userApi,
            avatarsApi,
            avatarVideosApi,
            storage,
        };
    }
}

export { Store };
