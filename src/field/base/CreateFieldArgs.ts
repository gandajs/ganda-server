import { ArgsType } from "@nestjs/graphql";
import { Field } from "./Field";
import { FieldCreateInput } from "./FieldCreateInput";

@ArgsType()
class CreateFieldArgs {
  @Field(() => FieldCreateInput, { nullable: false })
  data!: FieldCreateInput;
}

export { CreateFieldArgs };
