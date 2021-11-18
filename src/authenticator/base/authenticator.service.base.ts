import { PrismaService } from "nestjs-prisma";
import { Prisma, Authenticator } from "@prisma/client";

export class AuthenticatorServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.AuthenticatorFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.AuthenticatorFindManyArgs>
  ): Promise<number> {
    return this.prisma.authenticator.count(args);
  }

  async findMany<T extends Prisma.AuthenticatorFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.AuthenticatorFindManyArgs>
  ): Promise<Authenticator[]> {
    return this.prisma.authenticator.findMany(args);
  }
  async findOne<T extends Prisma.AuthenticatorFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.AuthenticatorFindUniqueArgs>
  ): Promise<Authenticator | null> {
    return this.prisma.authenticator.findUnique(args);
  }
  async create<T extends Prisma.AuthenticatorCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.AuthenticatorCreateArgs>
  ): Promise<Authenticator> {
    return this.prisma.authenticator.create<T>(args);
  }
  async update<T extends Prisma.AuthenticatorUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.AuthenticatorUpdateArgs>
  ): Promise<Authenticator> {
    return this.prisma.authenticator.update<T>(args);
  }
  async delete<T extends Prisma.AuthenticatorDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.AuthenticatorDeleteArgs>
  ): Promise<Authenticator> {
    return this.prisma.authenticator.delete(args);
  }
}
