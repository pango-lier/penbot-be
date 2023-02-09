export class CreateSocialTargetDto {
  name?: string;

  link: string;

  targetType?: string;

  social?: {
    id: number;
  };
}
