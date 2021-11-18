import { ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Field } from "../../field/base/Field";
import { Entity } from "../../entity/base/Entity";
import { Hook } from "../../hook/base/Hook";
@ObjectType()
class EntityLogic {
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
export { EntityLogic };
