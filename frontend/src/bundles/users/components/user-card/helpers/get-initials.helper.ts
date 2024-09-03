const getInitials = (fullName: string | undefined): string => {
    if (fullName) {
        const [firstName, lastName] = fullName.trim().split(/\s+/);
        const firstInitial = firstName?.charAt(0).toUpperCase();
        const secondInitial = lastName?.charAt(0).toUpperCase() ?? '';

        return `${firstInitial}${secondInitial}`;
    }
    return 'FN';
};

export { getInitials };
