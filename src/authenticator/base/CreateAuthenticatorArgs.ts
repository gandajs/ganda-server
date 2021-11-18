import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { AuthenticatorCreateInput } from "./AuthenticatorCreateInput";

@ArgsType()
class CreateAuthenticatorArgs {
  @Field(() => AuthenticatorCreateInput, { nullable: false })
  data!: AuthenticatorCreateInput;
}

export { CreateAuthenticatorArgs };
