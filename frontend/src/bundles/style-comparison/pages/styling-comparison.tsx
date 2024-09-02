import { Box, ChakraProvider, Heading, Text } from '@chakra-ui/react';

import { theme } from '~/framework/theme/theme.js';

import { InlineStylingButton } from '../components/inline-styling-button.js';
import { PropertyStylingButton } from '../components/property-styling-button.js';
import { ThemeStylingButton } from '../components/theme-styling-button.js';

function handleInlineButtonClick(): void {
    window.location.href = 'https://www.w3schools.com/react/react_css.asp';
}
function handlePropertyButtonClick(): void {
    window.location.href = 'https://v0.chakra-ui.com/style-props';
}

function handleThemeButtonClick(): void {
    window.location.href =
        'https://v2.chakra-ui.com/docs/styled-system/customize-theme';
}

const StylingComparison: React.FC = () => {
    return (
        <Box p={4}>
            <Heading as="h1" mb={4} color="black">
                Styling Comparison
            </Heading>
            All example code can be found in frontend/src/bundles/style-comparison
            <Box mb={4}>
                <Heading as="h2" size="md" mb={2} color="black">
                    Inline Styling
                </Heading>
                <Text mb={2} color="black" ml={4}>
                    Inline styling involves applying styles directly to the
                    element in the return statement using the `style` or `sx`
                    attributes.
                </Text>
                <Text mb={2} color="black" ml={4}>
                    <strong>Pros:</strong>
                    <ul>
                        <li>Quick and easy to apply styles.</li>
                        <li>
                            Styles are scoped to the component, avoiding
                            conflicts.
                        </li>
                        <li>Useful for unique styles.</li>
                    </ul>
                </Text>
                <Text mb={2} color="black" ml={4}>
                    <strong>Cons:</strong>
                    <ul>
                        <li>
                            Can lead to repetitive code if the same styles are
                            used in multiple places.
                        </li>
                        <li>
                            Harder to maintain and update styles across the
                            application.
                        </li>
                    </ul>
                </Text>
                {/* Inline styling looks clean on the outside as styles are directly applied to the component */}
                <InlineStylingButton
                    label="Inline Styled Button"
                    onClick={handleInlineButtonClick}
                />
            </Box>

            <Box mb={4}>
                <Heading as="h2" size="md" mb={2} color="black">
                    Prop Styling
                </Heading>
                <Text mb={2} color="black" ml={4}>
                    Prop styling involves passing styles as props to the
                    component, this allows dynamic and reusable styling. They
                    can be passed as `style` or `sx` properties.
                </Text>
                <Text mb={2} color="black" ml={4}>
                    <strong>Pros:</strong>
                    <ul>
                        <li>
                            Styles can be dynamically changed based on props.
                        </li>
                        <li>
                            Encapsulates styles within the component, promoting
                            reusability.
                        </li>
                        <li>Easy to override styles for specific instances.</li>
                    </ul>
                </Text>
                <Text mb={2} color="black" ml={4}>
                    <strong>Cons:</strong>
                    <ul>
                        <li>
                            Can lead to prop drilling if styles need to be
                            passed through multiple layers.
                        </li>
                        <li>
                            May become harder to manage as the number of style
                            props increases.
                        </li>
                    </ul>
                </Text>
                {/* In prop styling the style is passed as a prop where the object is implememted, if there are a lot of individual styles it can look messy */}
                <PropertyStylingButton
                    label="Prop Styled Button"
                    style={{
                        backgroundColor: '#3182ce',
                        color: 'white',
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                    onClick={handlePropertyButtonClick}
                />
            </Box>

            <Box mb={4}>
                <Heading as="h2" size="md" mb={2} color="black">
                    Chakra Theme Styling
                </Heading>
                <Text mb={2} color="black" ml={4}>
                    Chakra theme styling involves defining styles in a theme
                    object to expand Chakras default theme and applying them to components using the
                    `ChakraProvider` and `theme` props.
                </Text>
                <Text mb={2} color="black" ml={4}>
                    <strong>Pros:</strong>
                    <ul>
                        <li>Consistent styling across the whole app.</li>
                        <li>
                            Easy to maintain and update styles in one place.
                        </li>
                    </ul>
                </Text>
                <Text mb={2} color="black" ml={4}>
                    <strong>Cons:</strong>
                    <ul>
                        <li>Requires initial setup of the theme object.</li>
                        <li>Less flexibility for unique styles.</li>
                        <li>The theme object can become complex.</li>
                    </ul>
                </Text>
                {/* In theme styling your object or even whole page has to be sorrounded by the ChakraProvider and a custom theme must be defied and imported */}
                <ChakraProvider theme={theme}>
                    <div>
                        <ThemeStylingButton
                            label="Custom Theme Styled Button"
                            onClick={handleThemeButtonClick}
                        />
                    </div>
                </ChakraProvider>
            </Box>
        </Box>
    );
};

export { StylingComparison };
