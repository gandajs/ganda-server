import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { FunctionWhereUniqueInput } from "./FunctionWhereUniqueInput";
import { FunctionUpdateInput } from "./FunctionUpdateInput";

@ArgsType()
class UpdateFunctionArgs {
  @Field(() => FunctionWhereUniqueInput, { nullable: false })
  where!: FunctionWhereUniqueInput;
  @Field(() => FunctionUpdateInput, { nullable: false })
  data!: FunctionUpdateInput;
}

export { UpdateFunctionArgs };
