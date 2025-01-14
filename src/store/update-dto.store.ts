import { IsString } from "class-validator";
import { CreateStoreDto } from "./create-dto.store";

export class UpdateStoreDto extends CreateStoreDto {
  @IsString({
    message: "Описание обязательно",
  })
  description: string;
}
