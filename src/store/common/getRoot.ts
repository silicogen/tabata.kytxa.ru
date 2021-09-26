import { getRoot as getRoot0, IAnyStateTreeNode } from "mobx-state-tree";
import Root from "../Root";

export const getRoot = (self: IAnyStateTreeNode) => getRoot0<typeof Root>(self);