import { InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsEnum } from "class-validator";
import { Field } from "../../field/base/Field";
import { EnumApplicationType } from "./EnumApplicationType";
@InputType()
class ApplicationCreateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  block?: string | null;

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
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;

  @ApiProperty({
    required: false,
    enum: EnumApplicationType,
    isArray: true,
  })
  @IsEnum(EnumApplicationType, {
    each: true,
  })
  @IsOptional()
  @Field(() => [EnumApplicationType], {
    nullable: true,
  })
  type?: Array<"repository" | "url" | "block">;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  url?: string | null;
}
export { ApplicationCreateInput };
