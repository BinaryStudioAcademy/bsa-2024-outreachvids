import { Button } from '@chakra-ui/react';
// In theme styling the style is defined in the theme object and applied to the correct component by defining the variant property.
// In our project the theme object is defined in frontend/src/bundles/framework/theme/theme.ts.
type Properties = {
    label: string;
    variant?: 'themeExample';
    onClick?: () => void;
};

const ThemeStylingButton: React.FC<Properties> = ({
    label,
    variant = 'themeExample',
    onClick,
}) => (
    <Button variant={variant} onClick={onClick}>
        {label}
    </Button>
);

export { ThemeStylingButton };
