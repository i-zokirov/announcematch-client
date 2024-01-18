import { UserRoles } from '../../types/enums';
import { User } from '../../types/user';
import { apiUrl } from '../apiUrl';

export type SignInRequest = {
  email: string;
  password: string;
};

interface AuthSuccessResponse extends User {
  access_token: string;
}

type MeRequest = {
  access_token: string;
};

export type SignUpRequest = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRoles;
};

class AuthApi {
  async signIn(request: SignInRequest) {
    const { email, password } = request;

    const result = await apiUrl.post('/auth/login', { email, password });
    return result.data as AuthSuccessResponse;
  }

  async signUp(request: SignUpRequest) {
    const { role, ...rest } = request;
    const result = await apiUrl.post(`/auth/signup/${role}`, rest);
    return result.data as AuthSuccessResponse;
  }

  async me(request: MeRequest) {
    const { access_token } = request;

    const result = await apiUrl.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return result.data as User;
  }
}

export const authApi = new AuthApi();
