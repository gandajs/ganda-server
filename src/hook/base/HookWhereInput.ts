import { InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { Field } from "../../field/base/Field";
import { EntityWhereUniqueInput } from "../../entity/base/EntityWhereUniqueInput";
import { EntityLogicWhereUniqueInput } from "../../entityLogic/base/EntityLogicWhereUniqueInput";
import { FunctionWhereUniqueInput } from "../../function/base/FunctionWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
@InputType()
class HookWhereInput {
  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  description?: StringNullableFilter;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  displayName?: StringNullableFilter;

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
  entity?: EntityWhereUniqueInput;

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
  entityLogic?: EntityLogicWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  event?: StringNullableFilter;

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
  function?: FunctionWhereUniqueInput;

  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  id?: StringFilter;

  @ApiProperty({
    required: false,
    type: StringNullableFilter,
  })
  @Type(() => StringNullableFilter)
  @IsOptional()
  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  name?: StringNullableFilter;
}
export { HookWhereInput };
