export class UserRegistration {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dob: string;
  password: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    dob: string,
    password: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.gender = gender;
    this.dob = dob;
    this.password = password;
  }
}
