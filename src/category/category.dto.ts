import { IsString } from "class-validator";

export class CategoryDto {
  @IsString({ message: "Name is Necessarily" })
  title: string;
  @IsString({ message: "Description is Necessarily" })
  description: string;
}
