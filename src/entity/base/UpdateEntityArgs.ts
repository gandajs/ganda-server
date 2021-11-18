import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { EntityWhereUniqueInput } from "./EntityWhereUniqueInput";
import { EntityUpdateInput } from "./EntityUpdateInput";

@ArgsType()
class UpdateEntityArgs {
  @Field(() => EntityWhereUniqueInput, { nullable: false })
  where!: EntityWhereUniqueInput;
  @Field(() => EntityUpdateInput, { nullable: false })
  data!: EntityUpdateInput;
}

export { UpdateEntityArgs };
