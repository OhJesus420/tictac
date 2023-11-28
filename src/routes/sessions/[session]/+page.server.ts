import type { PageServerLoad } from './$types';


import {error, fail, type Actions} from "@sveltejs/kit"
import { prisma} from '$lib';



export const load: PageServerLoad = async ({params}) => {
    try {
    let session = params.session

        

    let existingSession = await prisma.session.findFirst({
        where: {name: session},
    });
    if (!existingSession) {
        throw new Error("session not found")
   
    }
    let messages = await prisma.message.findMany({
        where: { sessionId: existingSession.id },
    });
    

  return {session: existingSession, messages: messages};

} catch(error) {
    throw error;
}
};

export const actions: Actions={
    message:async ({request, params}) => {
        try {

        let sessionName = params.session;
        const existingSession = await prisma.session.findFirst({
            where: {name: sessionName}
        });
        let formData = await request.formData();
        let message = formData.get("message")?.toString();
        if (!message) {
            return fail(400, {message: "messege not found"})
        }
        if (!existingSession) {
            throw new Error("session not found")
        }
        else{
            await prisma.message.create({
                data: {
                    content: message,
                    sessionId: existingSession.id,
                },
            });
        }

        return {status: 200, body: {success: true} };
    } catch (error) {
        throw error;
    }
        

    },
};
