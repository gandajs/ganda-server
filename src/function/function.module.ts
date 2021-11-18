import { Module } from "@nestjs/common";
import { FunctionModuleBase } from "./base/function.module.base";
import { FunctionService } from "./function.service";
import { FunctionController } from "./function.controller";
import { FunctionResolver } from "./function.resolver";

@Module({
  imports: [FunctionModuleBase],
  controllers: [FunctionController],
  providers: [FunctionService, FunctionResolver],
  exports: [FunctionService],
})
export class FunctionModule {}
