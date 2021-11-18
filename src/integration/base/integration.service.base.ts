import { PrismaService } from "nestjs-prisma";
import { Prisma, Integration } from "@prisma/client";

export class IntegrationServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.IntegrationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.IntegrationFindManyArgs>
  ): Promise<number> {
    return this.prisma.integration.count(args);
  }

  async findMany<T extends Prisma.IntegrationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.IntegrationFindManyArgs>
  ): Promise<Integration[]> {
    return this.prisma.integration.findMany(args);
  }
  async findOne<T extends Prisma.IntegrationFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.IntegrationFindUniqueArgs>
  ): Promise<Integration | null> {
    return this.prisma.integration.findUnique(args);
  }
  async create<T extends Prisma.IntegrationCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.IntegrationCreateArgs>
  ): Promise<Integration> {
    return this.prisma.integration.create<T>(args);
  }
  async update<T extends Prisma.IntegrationUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.IntegrationUpdateArgs>
  ): Promise<Integration> {
    return this.prisma.integration.update<T>(args);
  }
  async delete<T extends Prisma.IntegrationDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.IntegrationDeleteArgs>
  ): Promise<Integration> {
    return this.prisma.integration.delete(args);
  }
}
