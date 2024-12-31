import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.quards';

export const Auth = () => UseGuards(JwtAuthGuard);
