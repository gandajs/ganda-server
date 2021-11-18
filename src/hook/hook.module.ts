import { Module } from "@nestjs/common";
import { HookModuleBase } from "./base/hook.module.base";
import { HookService } from "./hook.service";
import { HookController } from "./hook.controller";
import { HookResolver } from "./hook.resolver";

@Module({
  imports: [HookModuleBase],
  controllers: [HookController],
  providers: [HookService, HookResolver],
  exports: [HookService],
})
export class HookModule {}
