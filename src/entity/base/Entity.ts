import { ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsString,
  IsOptional,
  IsJSON,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { Field } from "../../field/base/Field";
import { GraphQLJSONObject } from "graphql-type-json";
import { JsonValue } from "type-fest";
import { EntityLogic } from "../../entityLogic/base/EntityLogic";
import { Hook } from "../../hook/base/Hook";
@ObjectType()
class Entity {
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  description!: string | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  displayName!: string;

  @ApiProperty({
    required: false,
  })
  @IsJSON()
  @IsOptional()
  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  ELP!: JsonValue | null;

  @ApiProperty({
    required: false,
    type: () => [EntityLogic],
  })
  @ValidateNested()
  @Type(() => EntityLogic)
  @IsOptional()
  entitiesLogic?: Array<EntityLogic>;

  @ApiProperty({
    required: false,
    type: () => [Field],
  })
  @ValidateNested()
  @Type(() => Field)
  @IsOptional()
  fields?: Array<Field>;

  @ApiProperty({
    required: false,
    type: () => [Hook],
  })
  @ValidateNested()
  @Type(() => Hook)
  @IsOptional()
  hooks?: Array<Hook>;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Entity };
