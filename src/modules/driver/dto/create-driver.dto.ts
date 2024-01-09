export class CreateDriverDto {
  name: string;
  email: string;
  phone?: string;
  document: string;
  license: string;
}