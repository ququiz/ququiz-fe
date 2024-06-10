"use server";

import { revalidatePath } from "next/cache";

export const revalidatePathServer = async (
  path: string,
  type: "layout" | "page" | undefined = undefined
) => {
  if (!type) {
    revalidatePath(path);
  } else {
    revalidatePath(path, type);
  }
};
