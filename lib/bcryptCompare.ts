import "server-only";
import bcryptjs from "bcryptjs";

export default async function bcryptCompare(password: string, nextPassword: string) {
    return await bcryptjs.compare(password, nextPassword);
};
