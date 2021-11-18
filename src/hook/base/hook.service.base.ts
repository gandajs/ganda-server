import { PrismaService } from "nestjs-prisma";
import { Prisma, Hook, Entity, EntityLogic, Function } from "@prisma/client";

export class HookServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.HookFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.HookFindManyArgs>
  ): Promise<number> {
    return this.prisma.hook.count(args);
  }

  async findMany<T extends Prisma.HookFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.HookFindManyArgs>
  ): Promise<Hook[]> {
    return this.prisma.hook.findMany(args);
  }
  async findOne<T extends Prisma.HookFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.HookFindUniqueArgs>
  ): Promise<Hook | null> {
    return this.prisma.hook.findUnique(args);
  }
  async create<T extends Prisma.HookCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.HookCreateArgs>
  ): Promise<Hook> {
    return this.prisma.hook.create<T>(args);
  }
  async update<T extends Prisma.HookUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.HookUpdateArgs>
  ): Promise<Hook> {
    return this.prisma.hook.update<T>(args);
  }
  async delete<T extends Prisma.HookDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.HookDeleteArgs>
  ): Promise<Hook> {
    return this.prisma.hook.delete(args);
  }

  async getEntity(parentId: string): Promise<Entity | null> {
    return this.prisma.hook
      .findUnique({
        where: { id: parentId },
      })
      .entity();
  }

  async getEntityLogic(parentId: string): Promise<EntityLogic | null> {
    return this.prisma.hook
      .findUnique({
        where: { id: parentId },
      })
      .entityLogic();
  }

  async getFunction(parentId: string): Promise<Function | null> {
    return this.prisma.hook
      .findUnique({
        where: { id: parentId },
      })
      .function();
  }
}
