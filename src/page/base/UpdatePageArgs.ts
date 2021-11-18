import { ArgsType } from "@nestjs/graphql";
import { Field } from "../../field/base/Field";
import { PageWhereUniqueInput } from "./PageWhereUniqueInput";
import { PageUpdateInput } from "./PageUpdateInput";

@ArgsType()
class UpdatePageArgs {
  @Field(() => PageWhereUniqueInput, { nullable: false })
  where!: PageWhereUniqueInput;
  @Field(() => PageUpdateInput, { nullable: false })
  data!: PageUpdateInput;
}

export { UpdatePageArgs };
