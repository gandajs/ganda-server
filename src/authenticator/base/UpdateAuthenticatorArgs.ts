import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { AuthenticatorWhereUniqueInput } from "./AuthenticatorWhereUniqueInput";
import { AuthenticatorUpdateInput } from "./AuthenticatorUpdateInput";

@ArgsType()
class UpdateAuthenticatorArgs {
  @Field(() => AuthenticatorWhereUniqueInput, { nullable: false })
  where!: AuthenticatorWhereUniqueInput;
  @Field(() => AuthenticatorUpdateInput, { nullable: false })
  data!: AuthenticatorUpdateInput;
}

export { UpdateAuthenticatorArgs };
