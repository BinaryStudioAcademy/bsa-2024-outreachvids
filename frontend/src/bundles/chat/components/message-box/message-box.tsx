import { Button, Flex, Input } from '~/bundles/common/components/components.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

const MessageBox: React.FC = () => {
    const handleSubmit = useCallback((): void => {}, []);
    const isEmpty = false;
    return (
        <form onSubmit={handleSubmit}>
            <Flex alignItems={'center'}>
                <Input
                    type="text"
                    label=""
                    placeholder="Send a message"
                    name="message"
                />
                <Button
                    type="submit"
                    label="Send"
                    size="md"
                    sx={{ mt: '16px' }}
                    isDisabled={isEmpty}
                />
            </Flex>
        </form>
    );
};

export { MessageBox };
