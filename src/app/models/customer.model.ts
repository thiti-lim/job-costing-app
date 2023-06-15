export class Customer {
  id: number;
  name: string;
  location: string;
  contact: string;
  phoneNumber: string;

  constructor(
    id: number,
    name: string,
    location: string,
    contact: string,
    phoneNumber: string
  ) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.contact = contact;
    this.phoneNumber = phoneNumber;
  }
}
