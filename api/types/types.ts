export interface User {
  //user_id: number, //is it even needed?
  name: string,
  email: string,
  university_id?: string,
  upi?: string,
  institution?: string,
  year_of_study?: string,
  study_field?: string,
  is_admin: boolean,
  is_paid: boolean,
  is_info_confirmed: boolean,
  created_at: Date,
  membership_expiry: Date
}

