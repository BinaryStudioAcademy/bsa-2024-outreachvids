const getInitials = (fullName: string | undefined): string => {
    if (fullName) {
        const splittedName = fullName.trim().split(/\s+/);
        const firstInitial = splittedName[0]?.charAt(0).toUpperCase();
        const secondInitial = splittedName[1]?.charAt(0).toUpperCase() ?? '';

        return `${firstInitial}${secondInitial}`;
    }
    return 'FN';
};

export { getInitials };
