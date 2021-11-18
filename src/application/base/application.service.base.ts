import { PrismaService } from "nestjs-prisma";
import { Prisma, Application } from "@prisma/client";

export class ApplicationServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ApplicationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ApplicationFindManyArgs>
  ): Promise<number> {
    return this.prisma.application.count(args);
  }

  async findMany<T extends Prisma.ApplicationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ApplicationFindManyArgs>
  ): Promise<Application[]> {
    return this.prisma.application.findMany(args);
  }
  async findOne<T extends Prisma.ApplicationFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ApplicationFindUniqueArgs>
  ): Promise<Application | null> {
    return this.prisma.application.findUnique(args);
  }
  async create<T extends Prisma.ApplicationCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ApplicationCreateArgs>
  ): Promise<Application> {
    return this.prisma.application.create<T>(args);
  }
  async update<T extends Prisma.ApplicationUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ApplicationUpdateArgs>
  ): Promise<Application> {
    return this.prisma.application.update<T>(args);
  }
  async delete<T extends Prisma.ApplicationDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ApplicationDeleteArgs>
  ): Promise<Application> {
    return this.prisma.application.delete(args);
  }
}
