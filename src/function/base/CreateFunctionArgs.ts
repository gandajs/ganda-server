import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { FunctionCreateInput } from "./FunctionCreateInput";

@ArgsType()
class CreateFunctionArgs {
  @Field(() => FunctionCreateInput, { nullable: false })
  data!: FunctionCreateInput;
}

export { CreateFunctionArgs };
