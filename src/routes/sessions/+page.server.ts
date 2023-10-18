

import type { PageServerLoad } from './$types'


import { error, type Actions, fail} from "@sveltejs/kit"


export let _sessions:Map<string,string[]> = new Map();


export const load = (async () => {
    return {sessions: _sessions}
}) satisfies PageServerLoad


export const actions: Actions = {
    create: async({request}) => {
        let data = await request.formData();
        let sessionName = data.get("sessionName")?.toString()
        if(!sessionName) {
            return fail (400, { sessionName: "Please supply a name"})
        }
        _sessions.set(sessionName, [])
    }


}
