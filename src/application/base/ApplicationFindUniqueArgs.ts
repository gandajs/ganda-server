import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { ApplicationWhereUniqueInput } from "./ApplicationWhereUniqueInput";

@ArgsType()
class ApplicationFindUniqueArgs {
  @Field(() => ApplicationWhereUniqueInput, { nullable: false })
  where!: ApplicationWhereUniqueInput;
}

export { ApplicationFindUniqueArgs };
