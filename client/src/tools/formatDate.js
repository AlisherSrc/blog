import { isValid, parseISO, format } from 'date-fns';


export const formatDate = (dateString) => {
    const date = parseISO(dateString);

    return isValid(date) ? format(new Date(dateString), 'dd-MM-yyyy') : 'Invalid Date';
}

