import { UseGuards } from '@nestjs/common';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { JwtAuthGuard } from '../guards/jwt-auth.quards';

export const Auth = () => UseGuards(JwtAuthGuard);
