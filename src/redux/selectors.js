export const getContacts = state => state.contacts.items;

export const getFilter = state => state.filter;

export const getIsLoading = state => state.contacts.isLoading;

export const getError = state => state.error;

export const getVisibleContact = state => {

    const contacts = getContacts(state);

    const filters = getFilter(state);

    const normalizedFilter = filters.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))

}

export const getUserName = state => state.auth.user.name;

export const getUserEmail = state => state.auth.user.email;

export const getIsLoged = state => state.auth.isLoged;

export const getUser = state => state.auth.user;

export const getIsRefreshing = state => state.auth.isRefreshing;

export const getErrorAuth = state => state.auth.error;