import { PrismaService } from "nestjs-prisma";
import { Prisma, Field, Entity } from "@prisma/client";

export class FieldServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.FieldFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.FieldFindManyArgs>
  ): Promise<number> {
    return this.prisma.field.count(args);
  }

  async findMany<T extends Prisma.FieldFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.FieldFindManyArgs>
  ): Promise<Field[]> {
    return this.prisma.field.findMany(args);
  }
  async findOne<T extends Prisma.FieldFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.FieldFindUniqueArgs>
  ): Promise<Field | null> {
    return this.prisma.field.findUnique(args);
  }
  async create<T extends Prisma.FieldCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.FieldCreateArgs>
  ): Promise<Field> {
    return this.prisma.field.create<T>(args);
  }
  async update<T extends Prisma.FieldUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.FieldUpdateArgs>
  ): Promise<Field> {
    return this.prisma.field.update<T>(args);
  }
  async delete<T extends Prisma.FieldDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.FieldDeleteArgs>
  ): Promise<Field> {
    return this.prisma.field.delete(args);
  }

  async getEntity(parentId: string): Promise<Entity | null> {
    return this.prisma.field
      .findUnique({
        where: { id: parentId },
      })
      .entity();
  }
}
