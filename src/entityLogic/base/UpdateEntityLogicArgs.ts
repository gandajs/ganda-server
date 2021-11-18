import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { EntityLogicWhereUniqueInput } from "./EntityLogicWhereUniqueInput";
import { EntityLogicUpdateInput } from "./EntityLogicUpdateInput";

@ArgsType()
class UpdateEntityLogicArgs {
  @Field(() => EntityLogicWhereUniqueInput, { nullable: false })
  where!: EntityLogicWhereUniqueInput;
  @Field(() => EntityLogicUpdateInput, { nullable: false })
  data!: EntityLogicUpdateInput;
}

export { UpdateEntityLogicArgs };
