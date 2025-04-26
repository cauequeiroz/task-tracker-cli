export const isValidNumber = id => id !== undefined && id.length > 0 && !isNaN(id);

export const isValidString = str => str && str.length > 0;