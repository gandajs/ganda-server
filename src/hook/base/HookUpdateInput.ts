import { InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested } from "class-validator";
import { Field } from "../../field/base/Field";
import { EntityWhereUniqueInput } from "../../entity/base/EntityWhereUniqueInput";
import { Type } from "class-transformer";
import { EntityLogicWhereUniqueInput } from "../../entityLogic/base/EntityLogicWhereUniqueInput";
import { FunctionWhereUniqueInput } from "../../function/base/FunctionWhereUniqueInput";
@InputType()
class HookUpdateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  displayName?: string | null;

  @ApiProperty({
    required: false,
    type: () => EntityWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => EntityWhereUniqueInput)
  @IsOptional()
  @Field(() => EntityWhereUniqueInput, {
    nullable: true,
  })
  entity?: EntityWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => EntityLogicWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => EntityLogicWhereUniqueInput)
  @IsOptional()
  @Field(() => EntityLogicWhereUniqueInput, {
    nullable: true,
  })
  entityLogic?: EntityLogicWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  event?: string | null;

  @ApiProperty({
    required: false,
    type: () => FunctionWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => FunctionWhereUniqueInput)
  @IsOptional()
  @Field(() => FunctionWhereUniqueInput, {
    nullable: true,
  })
  function?: FunctionWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  name?: string | null;
}
export { HookUpdateInput };
