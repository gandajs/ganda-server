import { ArgsType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { FunctionWhereInput } from "./FunctionWhereInput";
import { Field } from "../../field/base/Field";
import { Type } from "class-transformer";
import { FunctionOrderByInput } from "./FunctionOrderByInput";

@ArgsType()
class FunctionFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => FunctionWhereInput,
  })
  @Field(() => FunctionWhereInput, { nullable: true })
  @Type(() => FunctionWhereInput)
  where?: FunctionWhereInput;

  @ApiProperty({
    required: false,
    type: FunctionOrderByInput,
  })
  @Field(() => FunctionOrderByInput, { nullable: true })
  @Type(() => FunctionOrderByInput)
  orderBy?: FunctionOrderByInput;

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

export { FunctionFindManyArgs };
