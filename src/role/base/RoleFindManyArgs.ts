import { ArgsType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { RoleWhereInput } from "./RoleWhereInput";
import { Field } from "../../field/base/Field";
import { Type } from "class-transformer";
import { RoleOrderByInput } from "./RoleOrderByInput";

@ArgsType()
class RoleFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => RoleWhereInput,
  })
  @Field(() => RoleWhereInput, { nullable: true })
  @Type(() => RoleWhereInput)
  where?: RoleWhereInput;

  @ApiProperty({
    required: false,
    type: RoleOrderByInput,
  })
  @Field(() => RoleOrderByInput, { nullable: true })
  @Type(() => RoleOrderByInput)
  orderBy?: RoleOrderByInput;

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

export { RoleFindManyArgs };
