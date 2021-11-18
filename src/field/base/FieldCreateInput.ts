import { InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsOptional,
  ValidateNested,
  IsEnum,
  IsJSON,
} from "class-validator";
import { Field } from "./Field";
import { EntityWhereUniqueInput } from "../../entity/base/EntityWhereUniqueInput";
import { Type } from "class-transformer";
import { EnumFieldType } from "./EnumFieldType";
import { GraphQLJSONObject } from "graphql-type-json";
import { JsonValue } from "type-fest";
@InputType()
class FieldCreateInput {
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
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  displayName!: string;

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
    required: false,
  })
  @IsJSON()
  @IsOptional()
  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  validation?: JsonValue | null;
}
export { FieldCreateInput };
