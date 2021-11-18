import { ArgsType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { FieldWhereInput } from "./FieldWhereInput";
import { Field } from "./Field";
import { Type } from "class-transformer";
import { FieldOrderByInput } from "./FieldOrderByInput";

@ArgsType()
class FieldFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => FieldWhereInput,
  })
  @Field(() => FieldWhereInput, { nullable: true })
  @Type(() => FieldWhereInput)
  where?: FieldWhereInput;

  @ApiProperty({
    required: false,
    type: FieldOrderByInput,
  })
  @Field(() => FieldOrderByInput, { nullable: true })
  @Type(() => FieldOrderByInput)
  orderBy?: FieldOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { FieldFindManyArgs };
