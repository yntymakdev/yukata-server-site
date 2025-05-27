import { Controller, Get, Param } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";
import { Auth } from "src/auth/decorators/auth-decorators";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

@ApiTags("Статистика")
@ApiBearerAuth()
@Controller("statistics")
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Auth()
  @ApiOperation({ summary: "Получить основную статистику", description: "Возвращает основную статистику по магазину" })
  @ApiParam({ name: "storeId", description: "ID магазина" })
  @ApiResponse({ status: 200, description: "Успешный ответ с основной статистикой" })
  @Get("main/:storeId")
  async getMainStatistics(@Param("storeId") storeId: string) {
    return this.statisticsService.getMainStatistics(storeId);
  }

  @Auth()
  @ApiOperation({
    summary: "Получить промежуточную статистику",
    description: "Возвращает промежуточную статистику по магазину",
  })
  @ApiParam({ name: "storeId", description: "ID магазина" })
  @ApiResponse({ status: 200, description: "Успешный ответ с промежуточной статистикой" })
  @Get("middle/:storeId")
  async getMiddleStatistics(@Param("storeId") storeId: string) {
    return this.statisticsService.getMiddleStatistics(storeId);
  }
}
