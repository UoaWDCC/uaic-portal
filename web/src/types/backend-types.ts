export interface User {
    created_at:        Date;
    email:             string;
    institution?:      string;
    is_admin:          boolean;
    is_info_confirmed: boolean;
    is_paid:           boolean;
    membership_expiry: Date;
    name:              string;
    study_field?:      string;
    university_id?:    string;
    upi?:              string;
    year_of_study?:    string;
}
