import { IsNotEmpty, Min } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  gymName: string;

  @Min(0)
  latitude: number;

  @Min(0)
  longitude: number;
}
