export class Customer {
  id: number;
  name: string;
  location: string;
  phoneNumber: string;
  contact: string;

  constructor(
    id: number,
    name: string,
    location: string,
    phoneNumber: string,
    contact: string
  ) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.phoneNumber = phoneNumber;
    this.contact = contact;
  }
}
