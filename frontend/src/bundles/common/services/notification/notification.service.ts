import { type createStandaloneToast } from '@chakra-ui/react';

type Constructor = {
    toast: ReturnType<typeof createStandaloneToast>['toast'];
};

type NotifyProperties = {
    message: string;
    id: string;
    title: string;
    status?: 'info' | 'warning' | 'success' | 'error' | 'loading';
};

class NotificationService {
    private toast: ReturnType<typeof createStandaloneToast>['toast'];

    public constructor({ toast }: Constructor) {
        this.toast = toast;
    }

    public warn = ({ message, id, title }: NotifyProperties): void => {
        this.showToastNotification({
            message,
            id,
            title,
            status: 'warning',
        });
    };

    public loading = ({ message, id, title }: NotifyProperties): void => {
        this.showToastNotification({
            message,
            id,
            title,
            status: 'loading',
        });
    };

    public error = ({ message, id, title }: NotifyProperties): void => {
        this.showToastNotification({
            message,
            id,
            title,
            status: 'error',
        });
    };

    public success = ({ message, id, title }: NotifyProperties): void => {
        this.showToastNotification({
            message,
            id,
            title,
            status: 'success',
        });
    };

    public info = ({ message, id, title }: NotifyProperties): void => {
        this.showToastNotification({
            message,
            id,
            title,
            status: 'info',
        });
    };

    public isActive = (id: string): boolean => {
        return this.toast.isActive(id);
    };

    private showToastNotification = ({
        message,
        id,
        title,
        status,
    }: NotifyProperties): void => {
        if (status) {
            this.toast({
                id,
                title,
                description: message,
                status,
                duration: 7000,
                isClosable: true,
                position: 'top-right',
                variant: 'solid',
            });
        }
    };
}

export { NotificationService };
