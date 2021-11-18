import { registerEnumType } from "@nestjs/graphql";

export enum EnumFieldType {
  Text = "text",
  Textarea = "textarea",
  Option = "Option",
  DecimalNumber = "float",
  WholeNumber = "integer",
  DateTime = "dateTime",
  Boolean = "boolean",
}

registerEnumType(EnumFieldType, {
  name: "EnumFieldType",
});
