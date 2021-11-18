import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { AuthenticatorWhereUniqueInput } from "./AuthenticatorWhereUniqueInput";

@ArgsType()
class DeleteAuthenticatorArgs {
  @Field(() => AuthenticatorWhereUniqueInput, { nullable: false })
  where!: AuthenticatorWhereUniqueInput;
}

export { DeleteAuthenticatorArgs };
