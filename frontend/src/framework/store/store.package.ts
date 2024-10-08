import {
    type ThunkMiddleware,
    type Tuple,
    type UnknownAction,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { authApi } from '~/bundles/auth/auth.js';
import { reducer as authReducer } from '~/bundles/auth/store/auth.js';
import { chatApi } from '~/bundles/chat/chat.js';
import { reducer as chatReducer } from '~/bundles/chat/store/chat.js';
import { publicVideosApi, videosApi } from '~/bundles/common/api/api.js';
import { AppEnvironment } from '~/bundles/common/enums/enums.js';
import {
    draftMiddleware,
    errorMiddleware,
} from '~/bundles/common/middlewares/middlewares.js';
import { reducer as homeReducer } from '~/bundles/home/store/home.js';
import { reducer as studioReducer } from '~/bundles/studio/store/studio.js';
import {
    avatarsApi,
    avatarVideosApi,
    speechApi,
    templatesApi,
} from '~/bundles/studio/studio.js';
import { userApi } from '~/bundles/users/users.js';
import { type Config } from '~/framework/config/config.js';
import { storage } from '~/framework/storage/storage.js';

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
    studio: ReturnType<typeof studioReducer>;
    home: ReturnType<typeof homeReducer>;
    chat: ReturnType<typeof chatReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    userApi: typeof userApi;
    avatarsApi: typeof avatarsApi;
    videosApi: typeof videosApi;
    speechApi: typeof speechApi;
    avatarVideosApi: typeof avatarVideosApi;
    chatApi: typeof chatApi;
    templatesApi: typeof templatesApi;
    storage: typeof storage;
    publicVideosApi: typeof publicVideosApi;
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
                home: homeReducer,
                chat: chatReducer,
            },
            middleware: (getDefaultMiddleware) => {
                const middlewares = getDefaultMiddleware({
                    thunk: {
                        extraArgument: this.extraArguments,
                    },
                });
                return [
                    ...middlewares,
                    errorMiddleware,
                    draftMiddleware,
                ] as Tuple;
            },
        });
    }

    public get extraArguments(): ExtraArguments {
        return {
            authApi,
            userApi,
            avatarsApi,
            videosApi,
            speechApi,
            avatarVideosApi,
            chatApi,
            templatesApi,
            storage,
            publicVideosApi,
        };
    }
}

export { Store };
