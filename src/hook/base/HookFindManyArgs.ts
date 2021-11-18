import { ArgsType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { HookWhereInput } from "./HookWhereInput";
import { Field } from "../../field/base/Field";
import { Type } from "class-transformer";
import { HookOrderByInput } from "./HookOrderByInput";

@ArgsType()
class HookFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => HookWhereInput,
  })
  @Field(() => HookWhereInput, { nullable: true })
  @Type(() => HookWhereInput)
  where?: HookWhereInput;

  @ApiProperty({
    required: false,
    type: HookOrderByInput,
  })
  @Field(() => HookOrderByInput, { nullable: true })
  @Type(() => HookOrderByInput)
  orderBy?: HookOrderByInput;

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

export { HookFindManyArgs };
