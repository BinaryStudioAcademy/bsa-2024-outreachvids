const AppRoute = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    PROTECTED:'/protected',
    ANY: '*'
} as const;

export { AppRoute };
