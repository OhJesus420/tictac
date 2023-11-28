<script lang="ts">
  import { browser } from '$app/environment';
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { fade } from 'svelte/transition';
 
  export let data;
  export let form;


  $: messages = data.messages!.reverse()

  browser ? setInterval(invalidateAll, 1000) : null


</script>


<h1>Välkommen till session: {data.session.name}</h1>


<form action="?/message" method="post" use:enhance>
    <input type="text" name="message" />
    <button>SEND</button>
    {#if form?.message}
        <span>{form.message}</span>
    {/if}
</form>




{#each messages as message}
<div transition:fade|local>
    {message.content}
</div>  
{/each}