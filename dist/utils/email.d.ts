export declare const sendEmail: (to: string, subject: string, html: string) => Promise<void>;
export declare const sendReservationConfirmation: (email: string, reservationData: {
    firstName: string;
    lastName: string;
    packageTitle: string;
    startDate: string;
    endDate: string;
    numberOfPersons: number;
    totalPrice: number;
}) => Promise<void>;
//# sourceMappingURL=email.d.ts.map