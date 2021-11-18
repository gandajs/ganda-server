import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { FunctionWhereUniqueInput } from "./FunctionWhereUniqueInput";

@ArgsType()
class DeleteFunctionArgs {
  @Field(() => FunctionWhereUniqueInput, { nullable: false })
  where!: FunctionWhereUniqueInput;
}

export { DeleteFunctionArgs };
