import { type createStandaloneToast } from '@chakra-ui/react';

type Constructor = {
    toast: ReturnType<typeof createStandaloneToast>['toast'];
};

class ToastService {
    private toast: ReturnType<typeof createStandaloneToast>['toast'];

    public constructor({ toast }: Constructor) {
        this.toast = toast;
    }

    public warn = (message: string, toastId: string, title: string): void => {
        this.toast({
            id: toastId,
            title: title,
            description: message,
            status: 'warning',
            duration: 7000,
            isClosable: true,
            position: 'top-right',
            variant: 'solid',
        });
    };

    public loading = (
        message: string,
        toastId: string,
        title: string,
    ): void => {
        this.toast({
            id: toastId,
            title: title,
            description: message,
            status: 'loading',
            duration: 7000,
            isClosable: true,
            position: 'top-right',
            variant: 'solid',
        });
    };

    public error = (message: string, toastId: string, title: string): void => {
        this.toast({
            id: toastId,
            title: title,
            description: message,
            status: 'error',
            duration: 7000,
            isClosable: true,
            position: 'top-right',
            variant: 'solid',
        });
    };

    public success = (
        message: string,
        toastId: string,
        title: string,
    ): void => {
        this.toast({
            id: toastId,
            title: title,
            description: message,
            status: 'success',
            duration: 7000,
            isClosable: true,
            position: 'top-right',
            variant: 'solid',
        });
    };

    public info = (message: string, toastId: string, title: string): void => {
        this.toast({
            id: toastId,
            title: title,
            description: message,
            status: 'info',
            duration: 7000,
            isClosable: true,
            position: 'top-right',
            variant: 'solid',
        });
    };

    public isActive = (toastId: string): boolean => {
        return this.toast.isActive(toastId);
    };
}

export { ToastService };
