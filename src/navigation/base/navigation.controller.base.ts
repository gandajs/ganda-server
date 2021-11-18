import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { NavigationService } from "../navigation.service";
import { NavigationCreateInput } from "./NavigationCreateInput";
import { NavigationWhereInput } from "./NavigationWhereInput";
import { NavigationWhereUniqueInput } from "./NavigationWhereUniqueInput";
import { NavigationFindManyArgs } from "./NavigationFindManyArgs";
import { NavigationUpdateInput } from "./NavigationUpdateInput";
import { Navigation } from "./Navigation";
@swagger.ApiBearerAuth()
export class NavigationControllerBase {
  constructor(
    protected readonly service: NavigationService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Navigation",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Navigation })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: NavigationCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Navigation> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Navigation",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Navigation"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: {
        ...data,

        page: data.page
          ? {
              connect: data.page,
            }
          : undefined,

        parent: data.parent
          ? {
              connect: data.parent,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        displayName: true,
        id: true,
        locale: true,
        name: true,

        page: {
          select: {
            id: true,
          },
        },

        parent: {
          select: {
            id: true,
          },
        },

        path: true,
        role: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Navigation",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Navigation] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => NavigationFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Navigation[]> {
    const args = plainToClass(NavigationFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Navigation",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        createdAt: true,
        displayName: true,
        id: true,
        locale: true,
        name: true,

        page: {
          select: {
            id: true,
          },
        },

        parent: {
          select: {
            id: true,
          },
        },

        path: true,
        role: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Navigation",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Navigation })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: NavigationWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Navigation | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Navigation",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        createdAt: true,
        displayName: true,
        id: true,
        locale: true,
        name: true,

        page: {
          select: {
            id: true,
          },
        },

        parent: {
          select: {
            id: true,
          },
        },

        path: true,
        role: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Navigation",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Navigation })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: NavigationWhereUniqueInput,
    @common.Body()
    data: NavigationUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Navigation | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Navigation",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Navigation"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          page: data.page
            ? {
                connect: data.page,
              }
            : undefined,

          parent: data.parent
            ? {
                connect: data.parent,
              }
            : undefined,
        },
        select: {
          createdAt: true,
          displayName: true,
          id: true,
          locale: true,
          name: true,

          page: {
            select: {
              id: true,
            },
          },

          parent: {
            select: {
              id: true,
            },
          },

          path: true,
          role: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Navigation",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Navigation })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: NavigationWhereUniqueInput
  ): Promise<Navigation | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          createdAt: true,
          displayName: true,
          id: true,
          locale: true,
          name: true,

          page: {
            select: {
              id: true,
            },
          },

          parent: {
            select: {
              id: true,
            },
          },

          path: true,
          role: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id/navigations")
  @nestAccessControl.UseRoles({
    resource: "Navigation",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => NavigationWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyNavigations(
    @common.Req() request: Request,
    @common.Param() params: NavigationWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Navigation[]> {
    const query: NavigationWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Navigation",
    });
    const results = await this.service.findNavigations(params.id, {
      where: query,
      select: {
        createdAt: true,
        displayName: true,
        id: true,
        locale: true,
        name: true,

        page: {
          select: {
            id: true,
          },
        },

        parent: {
          select: {
            id: true,
          },
        },

        path: true,
        role: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post("/:id/navigations")
  @nestAccessControl.UseRoles({
    resource: "Navigation",
    action: "update",
    possession: "any",
  })
  async createNavigations(
    @common.Param() params: NavigationWhereUniqueInput,
    @common.Body() body: NavigationWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      navigations: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Navigation",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Navigation"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id/navigations")
  @nestAccessControl.UseRoles({
    resource: "Navigation",
    action: "update",
    possession: "any",
  })
  async updateNavigations(
    @common.Param() params: NavigationWhereUniqueInput,
    @common.Body() body: NavigationWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      navigations: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Navigation",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Navigation"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id/navigations")
  @nestAccessControl.UseRoles({
    resource: "Navigation",
    action: "update",
    possession: "any",
  })
  async deleteNavigations(
    @common.Param() params: NavigationWhereUniqueInput,
    @common.Body() body: NavigationWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      navigations: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Navigation",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Navigation"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
