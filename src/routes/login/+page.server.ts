
import { prisma } from "$lib";
import { fail, redirect } from "@sveltejs/kit";
import bcrypt from 'bcrypt';



async function hashPassword(password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return { salt, hash };
}
  

export const load = async ({ cookies }: { cookies: any }) => {
    let username = cookies.get("username");
    if (username) {
        throw redirect(303, "/");
    }
};

export const actions = {
    login: async ({
        request,
        cookies,
    }: {
        request: Request;
        cookies: any;
    }) => {
        let data = await request.formData();
        let username = data.get("username")?.toString();
        let password = data.get("password")?.toString();

        if (username && password) {
            const existingUser = await prisma.user.findUnique({
                where: { name: username },
            });

            if (existingUser) {
                if (existingUser.password == password) {
                    cookies.set("username", username, { secure: false });
                    throw redirect(307, "/");
                } else {
                    return fail(400, { password: "Wrong password" });
                }
            } else {
                const { salt, hash } = await hashPassword(password);
                await prisma.user.create({
                    data: {
                        name: username,
                        password: password,
                        salt: salt,
                        hash: hash,
                    } 
                });

                cookies.set("username", username, { secure: false });
                console.log(username + " logged in");
            }
        
        }
        console.log(cookies.get("username"));
    },

    logout: async ({
        request,
        cookies,
    }: {
        request: Request;
        cookies: any;
    }) => {
        let username = cookies.get("username");

        if (!username) {
            return fail(400, { username: "no username detected" });
        }
        cookies.delete("username");
    },
};
