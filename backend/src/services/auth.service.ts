import User from "../models/User";
import { LoginRequest, LoginResponse } from "../types/auth/auth";
import { JwtTokens } from "../types/jwt/jwt";
import { RegisterRequest, User as MongooseUser } from "../types/user/user";
import * as BcryptUtility from "../utils/bcrypt.util";
import * as JwtUtility from "../utils/jwt.util";

export const login = async (request: LoginRequest): Promise<JwtTokens> => {
  const user = await User.findOne({ username: request.username }).lean();

  if (!user) {
    throw new Error("Username does not exist");
  }

  const plainPassword = request.password;
  const hashedPassword = user.password;

  const isMatchingPasswords = await BcryptUtility.verifyPassword(
    plainPassword,
    hashedPassword,
  );

  if (!isMatchingPasswords) {
    throw new Error("Invalid password");
  }

  const userId = user._id.toString();

  return JwtUtility.generateTokens(userId, user.role);
};

export const register = async (
  request: RegisterRequest,
): Promise<MongooseUser> => {
  const hashedPassword = await BcryptUtility.hashPassword(request.password);

  const user = {
    firstName: request.firstName,
    lastName: request.lastName,
    username: request.username,
    password: hashedPassword,
    role: request.role,
  };

  return await User.create(user);
};
