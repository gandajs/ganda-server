import { ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Field } from "../../field/base/Field";
import { Entity } from "../../entity/base/Entity";
import { EntityLogic } from "../../entityLogic/base/EntityLogic";
import { Function } from "../../function/base/Function";
@ObjectType()
class Hook {
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
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  displayName!: string | null;

  @ApiProperty({
    required: false,
    type: () => Entity,
  })
  @ValidateNested()
  @Type(() => Entity)
  @IsOptional()
  entity?: Entity | null;

  @ApiProperty({
    required: false,
    type: () => EntityLogic,
  })
  @ValidateNested()
  @Type(() => EntityLogic)
  @IsOptional()
  entityLogic?: EntityLogic | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  event!: string | null;

  @ApiProperty({
    required: false,
    type: () => Function,
  })
  @ValidateNested()
  @Type(() => Function)
  @IsOptional()
  function?: Function | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  name!: string | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Hook };
