import { PrismaService } from "nestjs-prisma";
import { Prisma, Navigation, Page } from "@prisma/client";

export class NavigationServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.NavigationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.NavigationFindManyArgs>
  ): Promise<number> {
    return this.prisma.navigation.count(args);
  }

  async findMany<T extends Prisma.NavigationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.NavigationFindManyArgs>
  ): Promise<Navigation[]> {
    return this.prisma.navigation.findMany(args);
  }
  async findOne<T extends Prisma.NavigationFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.NavigationFindUniqueArgs>
  ): Promise<Navigation | null> {
    return this.prisma.navigation.findUnique(args);
  }
  async create<T extends Prisma.NavigationCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.NavigationCreateArgs>
  ): Promise<Navigation> {
    return this.prisma.navigation.create<T>(args);
  }
  async update<T extends Prisma.NavigationUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.NavigationUpdateArgs>
  ): Promise<Navigation> {
    return this.prisma.navigation.update<T>(args);
  }
  async delete<T extends Prisma.NavigationDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.NavigationDeleteArgs>
  ): Promise<Navigation> {
    return this.prisma.navigation.delete(args);
  }

  async findNavigations(
    parentId: string,
    args: Prisma.NavigationFindManyArgs
  ): Promise<Navigation[]> {
    return this.prisma.navigation
      .findUnique({
        where: { id: parentId },
      })
      .navigations(args);
  }

  async getPage(parentId: string): Promise<Page | null> {
    return this.prisma.navigation
      .findUnique({
        where: { id: parentId },
      })
      .page();
  }

  async getParent(parentId: string): Promise<Navigation | null> {
    return this.prisma.navigation
      .findUnique({
        where: { id: parentId },
      })
      .parent();
  }
}
