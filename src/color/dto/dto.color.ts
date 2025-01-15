import { IsString } from "class-validator";

export class ColorDto {
  @IsString({ message: "Name is Necessarily" })
  name: string;
  @IsString({ message: "Value is Necessarily" })
  value: string;
}
