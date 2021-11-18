import { registerEnumType } from "@nestjs/graphql";

export enum EnumApplicationType {
  Repository = "repository",
  Url = "url",
  Block = "block",
}

registerEnumType(EnumApplicationType, {
  name: "EnumApplicationType",
});
