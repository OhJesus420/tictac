

import type { PageServerLoad } from './$types'

import { prisma } from '$lib';
import { error, type Actions, fail } from "@sveltejs/kit"




export const load = (async () => {
    let _sessions = await prisma.session.findMany()
    return { sessions: _sessions }
}) satisfies PageServerLoad


export const actions = {
    create: async ({ request }) => {

        let data = await request.formData();
        let sessionName = data.get("sessionName")?.toString();
        

        if (!sessionName) {
        return fail(400, { sessionName: "Session name is required" });
      }
  
      const existingSession = await prisma.session.findUnique({
        where: { name: sessionName },
      });
  
      if (existingSession) {
        return fail(400, { sessionName: "Session name already exists" });
      } else {
        await prisma.session.create({
          data: {
            name: sessionName,
          },
        });
  
        console.log(sessionName + " session created");
      }
    },
  };

