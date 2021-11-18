import { ArgsType } from "@nestjs/graphql";
import { Field } from "./Field";
import { FieldWhereUniqueInput } from "./FieldWhereUniqueInput";
import { FieldUpdateInput } from "./FieldUpdateInput";

@ArgsType()
class UpdateFieldArgs {
  @Field(() => FieldWhereUniqueInput, { nullable: false })
  where!: FieldWhereUniqueInput;
  @Field(() => FieldUpdateInput, { nullable: false })
  data!: FieldUpdateInput;
}

export { UpdateFieldArgs };
