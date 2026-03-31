export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtClaims {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}
