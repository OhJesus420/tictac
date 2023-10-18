<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';

    export let data: PageData;
</script>


<a href="/sessions" >Feta sessions</a>

<h1>
    HOME
</h1>


<form method="post" action="/login?/logout" use:enhance>


    <button>LOGOUT</button>

 
</form>
