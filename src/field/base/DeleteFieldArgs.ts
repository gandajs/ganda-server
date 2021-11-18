import { ArgsType } from "@nestjs/graphql";
import { Field } from "./Field";
import { FieldWhereUniqueInput } from "./FieldWhereUniqueInput";

@ArgsType()
class DeleteFieldArgs {
  @Field(() => FieldWhereUniqueInput, { nullable: false })
  where!: FieldWhereUniqueInput;
}

export { DeleteFieldArgs };
