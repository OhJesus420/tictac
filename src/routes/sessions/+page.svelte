<script lang="ts">
  import { enhance } from '$app/forms';


  export let data;
  export let form;




</script>


<ul>
{#each data.sessions as [session, message]}
  <li><a data-sveltekit-preload-data="tap" class="sessionname" href="/sessions/{session}">{session}, {message.length}</a></li>
{/each}
</ul>




<form action="?/create" method="post" use:enhance>
  <label for="sessionName">Session name</label>
  <input type="text" name="sessionName">
  {#if form?.sessionName}
      <span>{form.sessionName}</span>
  {/if}
</form>


  