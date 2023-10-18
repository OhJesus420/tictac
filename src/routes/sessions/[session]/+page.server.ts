import type { PageServerLoad } from './$types';


import{_sessions} from "../+page.server"
import {error, fail, type Actions} from "@sveltejs/kit"


export const load = (async ({params}) => {
    let session = params.session
    if (!_sessions.has(session)) {
        throw error(418, "session not found")
    }
    let message = _sessions.get(session)


    return {session, message};
}) satisfies PageServerLoad;


export const actions: Actions={
    message:async ({request, params}) => {
        let session = params.session
        if(!session || !_sessions.has(session)) {
            throw error(417, "session not found")
        }
        let data = await request.formData()
        let message = data.get("message")?.toString()
        if (!message) {
            return fail(400, {message: "not found"})
        }
        let messages = _sessions.get(session)!
        messages.push(message)
    }
}
