import { Module } from "@nestjs/common";
import { FieldModuleBase } from "./base/field.module.base";
import { FieldService } from "./field.service";
import { FieldController } from "./field.controller";
import { FieldResolver } from "./field.resolver";

@Module({
  imports: [FieldModuleBase],
  controllers: [FieldController],
  providers: [FieldService, FieldResolver],
  exports: [FieldService],
})
export class FieldModule {}
