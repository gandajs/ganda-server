import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { EntityLogicCreateInput } from "./EntityLogicCreateInput";

@ArgsType()
class CreateEntityLogicArgs {
  @Field(() => EntityLogicCreateInput, { nullable: false })
  data!: EntityLogicCreateInput;
}

export { CreateEntityLogicArgs };
