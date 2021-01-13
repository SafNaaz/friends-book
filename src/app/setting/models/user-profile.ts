export class UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dob: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  profession: string;
  id: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    dob: string,
    phone: string,
    city: string,
    state: string,
    country: string,
    pincode: string,
    profession: string,
    id: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.gender = gender;
    this.dob = dob;
    this.phone = phone;
    this.city = city;
    this.state = state;
    this.country = country;
    this.pincode = pincode;
    this.profession = profession;
    this.id = id;
  }
}
