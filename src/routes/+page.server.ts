import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


export const load = (async ({cookies}) => {


    if(!cookies.get("username")){
        throw redirect(307,'/login')
    }
    return {};
}) satisfies PageServerLoad;
