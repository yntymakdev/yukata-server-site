import { IsString } from "class-validator";

export class CreateStoreDto {
  @IsString({ message: "Name is Necessarily" })
  name: string;
  @IsString({ message: "Value is Necessarily" })
  value: string;
}
