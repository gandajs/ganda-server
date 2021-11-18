import { InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested } from "class-validator";
import { Field } from "../../field/base/Field";
import { PageWhereUniqueInput } from "../../page/base/PageWhereUniqueInput";
import { Type } from "class-transformer";
import { NavigationWhereUniqueInput } from "./NavigationWhereUniqueInput";
@InputType()
class NavigationUpdateInput {
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
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  locale?: string | null;

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

  @ApiProperty({
    required: false,
    type: () => PageWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PageWhereUniqueInput)
  @IsOptional()
  @Field(() => PageWhereUniqueInput, {
    nullable: true,
  })
  page?: PageWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: () => NavigationWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => NavigationWhereUniqueInput)
  @IsOptional()
  @Field(() => NavigationWhereUniqueInput, {
    nullable: true,
  })
  parent?: NavigationWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  path?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  role?: string | null;
}
export { NavigationUpdateInput };
