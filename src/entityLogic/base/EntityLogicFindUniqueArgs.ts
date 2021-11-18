import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { EntityLogicWhereUniqueInput } from "./EntityLogicWhereUniqueInput";

@ArgsType()
class EntityLogicFindUniqueArgs {
  @Field(() => EntityLogicWhereUniqueInput, { nullable: false })
  where!: EntityLogicWhereUniqueInput;
}

export { EntityLogicFindUniqueArgs };
