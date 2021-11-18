import { ArgsType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { UserWhereInput } from "./UserWhereInput";
import { Field } from "../../field/base/Field";
import { Type } from "class-transformer";
import { UserOrderByInput } from "./UserOrderByInput";

@ArgsType()
class UserFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => UserWhereInput,
  })
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @ApiProperty({
    required: false,
    type: UserOrderByInput,
  })
  @Field(() => UserOrderByInput, { nullable: true })
  @Type(() => UserOrderByInput)
  orderBy?: UserOrderByInput;

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

export { UserFindManyArgs };