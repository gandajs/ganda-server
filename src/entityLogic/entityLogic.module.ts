import { Module } from "@nestjs/common";
import { EntityLogicModuleBase } from "./base/entityLogic.module.base";
import { EntityLogicService } from "./entityLogic.service";
import { EntityLogicController } from "./entityLogic.controller";
import { EntityLogicResolver } from "./entityLogic.resolver";

@Module({
  imports: [EntityLogicModuleBase],
  controllers: [EntityLogicController],
  providers: [EntityLogicService, EntityLogicResolver],
  exports: [EntityLogicService],
})
export class EntityLogicModule {}
