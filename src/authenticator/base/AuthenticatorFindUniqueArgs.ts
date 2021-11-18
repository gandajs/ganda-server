import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { AuthenticatorWhereUniqueInput } from "./AuthenticatorWhereUniqueInput";

@ArgsType()
class AuthenticatorFindUniqueArgs {
  @Field(() => AuthenticatorWhereUniqueInput, { nullable: false })
  where!: AuthenticatorWhereUniqueInput;
}

export { AuthenticatorFindUniqueArgs };
