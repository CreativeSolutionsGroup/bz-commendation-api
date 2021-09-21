interface Commendation {
    _id: string;
    date: string;
    message: string;
    fromEmail: string;
    toEmail: string;
    otherEmails: string[];
    phone: string;
}

export default Commendation;