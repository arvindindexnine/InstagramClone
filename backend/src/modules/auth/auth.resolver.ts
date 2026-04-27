import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './schemas/user.schema';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './dto/auth-response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async register(@Args('input') input: RegisterInput): Promise<User> {
    const { username, email, password } = input;
    return this.authService.register(username, email, password);
  }

  @Mutation(() => AuthResponse)
  async login(@Args('input') input: LoginInput): Promise<AuthResponse> {
    const { identifier, password } = input;
    return this.authService.login(identifier, password);
  }

  @Query(() => [User])
  async searchUsers(@Args('query') query: string): Promise<User[]> {
    return this.authService.searchUsers(query);
  }
}
