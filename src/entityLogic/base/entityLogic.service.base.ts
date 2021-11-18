import { PrismaService } from "nestjs-prisma";
import { Prisma, EntityLogic, Hook, Entity } from "@prisma/client";

export class EntityLogicServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.EntityLogicFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.EntityLogicFindManyArgs>
  ): Promise<number> {
    return this.prisma.entityLogic.count(args);
  }

  async findMany<T extends Prisma.EntityLogicFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.EntityLogicFindManyArgs>
  ): Promise<EntityLogic[]> {
    return this.prisma.entityLogic.findMany(args);
  }
  async findOne<T extends Prisma.EntityLogicFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.EntityLogicFindUniqueArgs>
  ): Promise<EntityLogic | null> {
    return this.prisma.entityLogic.findUnique(args);
  }
  async create<T extends Prisma.EntityLogicCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.EntityLogicCreateArgs>
  ): Promise<EntityLogic> {
    return this.prisma.entityLogic.create<T>(args);
  }
  async update<T extends Prisma.EntityLogicUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.EntityLogicUpdateArgs>
  ): Promise<EntityLogic> {
    return this.prisma.entityLogic.update<T>(args);
  }
  async delete<T extends Prisma.EntityLogicDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.EntityLogicDeleteArgs>
  ): Promise<EntityLogic> {
    return this.prisma.entityLogic.delete(args);
  }

  async findHooks(
    parentId: string,
    args: Prisma.HookFindManyArgs
  ): Promise<Hook[]> {
    return this.prisma.entityLogic
      .findUnique({
        where: { id: parentId },
      })
      .hooks(args);
  }

  async getEntity(parentId: string): Promise<Entity | null> {
    return this.prisma.entityLogic
      .findUnique({
        where: { id: parentId },
      })
      .entity();
  }
}
