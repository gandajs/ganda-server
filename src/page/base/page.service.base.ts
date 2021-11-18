import { PrismaService } from "nestjs-prisma";
import { Prisma, Page, Navigation } from "@prisma/client";

export class PageServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.PageFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PageFindManyArgs>
  ): Promise<number> {
    return this.prisma.page.count(args);
  }

  async findMany<T extends Prisma.PageFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PageFindManyArgs>
  ): Promise<Page[]> {
    return this.prisma.page.findMany(args);
  }
  async findOne<T extends Prisma.PageFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PageFindUniqueArgs>
  ): Promise<Page | null> {
    return this.prisma.page.findUnique(args);
  }
  async create<T extends Prisma.PageCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PageCreateArgs>
  ): Promise<Page> {
    return this.prisma.page.create<T>(args);
  }
  async update<T extends Prisma.PageUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PageUpdateArgs>
  ): Promise<Page> {
    return this.prisma.page.update<T>(args);
  }
  async delete<T extends Prisma.PageDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PageDeleteArgs>
  ): Promise<Page> {
    return this.prisma.page.delete(args);
  }

  async findNavigations(
    parentId: string,
    args: Prisma.NavigationFindManyArgs
  ): Promise<Navigation[]> {
    return this.prisma.page
      .findUnique({
        where: { id: parentId },
      })
      .navigations(args);
  }
}
