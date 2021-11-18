import { PrismaService } from "nestjs-prisma";
import { Prisma, Entity, EntityLogic, Field, Hook } from "@prisma/client";

export class EntityServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.EntityFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.EntityFindManyArgs>
  ): Promise<number> {
    return this.prisma.entity.count(args);
  }

  async findMany<T extends Prisma.EntityFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.EntityFindManyArgs>
  ): Promise<Entity[]> {
    return this.prisma.entity.findMany(args);
  }
  async findOne<T extends Prisma.EntityFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.EntityFindUniqueArgs>
  ): Promise<Entity | null> {
    return this.prisma.entity.findUnique(args);
  }
  async create<T extends Prisma.EntityCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.EntityCreateArgs>
  ): Promise<Entity> {
    return this.prisma.entity.create<T>(args);
  }
  async update<T extends Prisma.EntityUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.EntityUpdateArgs>
  ): Promise<Entity> {
    return this.prisma.entity.update<T>(args);
  }
  async delete<T extends Prisma.EntityDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.EntityDeleteArgs>
  ): Promise<Entity> {
    return this.prisma.entity.delete(args);
  }

  async findEntitiesLogic(
    parentId: string,
    args: Prisma.EntityLogicFindManyArgs
  ): Promise<EntityLogic[]> {
    return this.prisma.entity
      .findUnique({
        where: { id: parentId },
      })
      .entitiesLogic(args);
  }

  async findFields(
    parentId: string,
    args: Prisma.FieldFindManyArgs
  ): Promise<Field[]> {
    return this.prisma.entity
      .findUnique({
        where: { id: parentId },
      })
      .fields(args);
  }

  async findHooks(
    parentId: string,
    args: Prisma.HookFindManyArgs
  ): Promise<Hook[]> {
    return this.prisma.entity
      .findUnique({
        where: { id: parentId },
      })
      .hooks(args);
  }
}
