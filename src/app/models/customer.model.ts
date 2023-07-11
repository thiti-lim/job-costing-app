export class Customer {
  id?: number;
  name: string;
  location: string;
  contact: string;
  phoneNumber: string;

  constructor(
    name: string,
    location: string,
    contact: string,
    phoneNumber: string
  ) {
    this.name = name;
    this.location = location;
    this.contact = contact;
    this.phoneNumber = phoneNumber;
  }
}
