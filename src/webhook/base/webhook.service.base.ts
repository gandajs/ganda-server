import { PrismaService } from "nestjs-prisma";
import { Prisma, Webhook } from "@prisma/client";

export class WebhookServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.WebhookFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.WebhookFindManyArgs>
  ): Promise<number> {
    return this.prisma.webhook.count(args);
  }

  async findMany<T extends Prisma.WebhookFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.WebhookFindManyArgs>
  ): Promise<Webhook[]> {
    return this.prisma.webhook.findMany(args);
  }
  async findOne<T extends Prisma.WebhookFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.WebhookFindUniqueArgs>
  ): Promise<Webhook | null> {
    return this.prisma.webhook.findUnique(args);
  }
  async create<T extends Prisma.WebhookCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.WebhookCreateArgs>
  ): Promise<Webhook> {
    return this.prisma.webhook.create<T>(args);
  }
  async update<T extends Prisma.WebhookUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.WebhookUpdateArgs>
  ): Promise<Webhook> {
    return this.prisma.webhook.update<T>(args);
  }
  async delete<T extends Prisma.WebhookDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.WebhookDeleteArgs>
  ): Promise<Webhook> {
    return this.prisma.webhook.delete(args);
  }
}
