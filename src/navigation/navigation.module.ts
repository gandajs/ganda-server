import { Module } from "@nestjs/common";
import { NavigationModuleBase } from "./base/navigation.module.base";
import { NavigationService } from "./navigation.service";
import { NavigationController } from "./navigation.controller";
import { NavigationResolver } from "./navigation.resolver";

@Module({
  imports: [NavigationModuleBase],
  controllers: [NavigationController],
  providers: [NavigationService, NavigationResolver],
  exports: [NavigationService],
})
export class NavigationModule {}
