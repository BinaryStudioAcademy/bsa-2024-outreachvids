import { Heading, Text } from '~/bundles/common/components/components.js';

type Properties = {
    headerText: string;
    subheader: React.ReactNode;
};

const FormHeader: React.FC<Properties> = ({ headerText, subheader }) => {
    return (
        <>
            {/* TODO: Add logo */}
            <h2 style={{ marginBottom: '50px' }}>LOGO</h2>
            <Heading as="h1" color="white" mb="0.4rem">
                {headerText}
            </Heading>
            <Text mb="1.5rem">{subheader}</Text>
        </>
    );
};

export { FormHeader };
