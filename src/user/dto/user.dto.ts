// user/dto/user.dto.ts
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({ example: "a1b2c3d4", description: "Уникальный идентификатор пользователя" })
  id: string;

  @ApiProperty({ example: "john@example.com", description: "Email пользователя" })
  email: string;

  @ApiProperty({ example: "John", description: "Имя пользователя" })
  name: string;

  @ApiProperty({ example: ["product123", "product456"], description: "Список избранных товаров" })
  favorites: string[];
}
