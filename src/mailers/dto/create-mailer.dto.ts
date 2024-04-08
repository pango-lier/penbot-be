export class CreateMailerDto {
  city?: string;
  zip?: string;
  formatted_address?: string;
  address?: string;
  state?: string;
  country?: string;
  name?: string;
  email: string;
  active?: boolean;
}
