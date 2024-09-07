import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { FindAllCommanderQueryDto } from './dto/find-all-commander.dto';
import { FindAllCommandersService } from './services/find-all-commanders.service';
import { Role } from '../users/enums/role.enum';
import { Roles } from '../users/decorators/roles.decorator';

@ApiTags('Commanders')
@Controller('commanders')
@ApiBearerAuth()
export class CommandersController {
  constructor(
    private readonly FindAllCommandersService: FindAllCommandersService,
  ) {}

  @Get()
  @Roles(Role.USER)
  async findAll(@Query() query: FindAllCommanderQueryDto) {
    return this.FindAllCommandersService.execute(query);
  }
}
