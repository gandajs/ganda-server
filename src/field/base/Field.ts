import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsString,
  IsOptional,
  ValidateNested,
  IsEnum,
  IsJSON,
} from "class-validator";
import { Type } from "class-transformer";
import { Entity } from "../../entity/base/Entity";
import { EnumFieldType } from "./EnumFieldType";
import { GraphQLJSONObject } from "graphql-type-json";
import { JsonValue } from "type-fest";
@ObjectType()
class Field {
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
    type: () => Entity,
  })
  @ValidateNested()
  @Type(() => Entity)
  @IsOptional()
  entity?: Entity | null;

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
    required: false,
    enum: EnumFieldType,
  })
  @IsEnum(EnumFieldType)
  @IsOptional()
  @Field(() => EnumFieldType, {
    nullable: true,
  })
  type?:
    | "text"
    | "textarea"
    | "Option"
    | "float"
    | "integer"
    | "dateTime"
    | "boolean"
    | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;

  @ApiProperty({
    required: false,
  })
  @IsJSON()
  @IsOptional()
  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  validation!: JsonValue | null;
}
export { Field };
