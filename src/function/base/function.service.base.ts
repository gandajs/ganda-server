import { PrismaService } from "nestjs-prisma";
import { Prisma, Function, Hook } from "@prisma/client";

export class FunctionServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.FunctionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.FunctionFindManyArgs>
  ): Promise<number> {
    return this.prisma.function.count(args);
  }

  async findMany<T extends Prisma.FunctionFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.FunctionFindManyArgs>
  ): Promise<Function[]> {
    return this.prisma.function.findMany(args);
  }
  async findOne<T extends Prisma.FunctionFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.FunctionFindUniqueArgs>
  ): Promise<Function | null> {
    return this.prisma.function.findUnique(args);
  }
  async create<T extends Prisma.FunctionCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.FunctionCreateArgs>
  ): Promise<Function> {
    return this.prisma.function.create<T>(args);
  }
  async update<T extends Prisma.FunctionUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.FunctionUpdateArgs>
  ): Promise<Function> {
    return this.prisma.function.update<T>(args);
  }
  async delete<T extends Prisma.FunctionDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.FunctionDeleteArgs>
  ): Promise<Function> {
    return this.prisma.function.delete(args);
  }

  async findHooks(
    parentId: string,
    args: Prisma.HookFindManyArgs
  ): Promise<Hook[]> {
    return this.prisma.function
      .findUnique({
        where: { id: parentId },
      })
      .hooks(args);
  }
}
