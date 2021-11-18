import { ArgsType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { AuthenticatorWhereInput } from "./AuthenticatorWhereInput";
import { Field } from "../../field/base/Field";
import { Type } from "class-transformer";
import { AuthenticatorOrderByInput } from "./AuthenticatorOrderByInput";

@ArgsType()
class AuthenticatorFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => AuthenticatorWhereInput,
  })
  @Field(() => AuthenticatorWhereInput, { nullable: true })
  @Type(() => AuthenticatorWhereInput)
  where?: AuthenticatorWhereInput;

  @ApiProperty({
    required: false,
    type: AuthenticatorOrderByInput,
  })
  @Field(() => AuthenticatorOrderByInput, { nullable: true })
  @Type(() => AuthenticatorOrderByInput)
  orderBy?: AuthenticatorOrderByInput;

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

export { AuthenticatorFindManyArgs };
