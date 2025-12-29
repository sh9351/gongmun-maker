<script>
  export let href;
  export let text;
  export let page;
  export let goto;
  export let disabled = false;
</script>

<li class="nav-item">
  {#if disabled}
    <button
      class="nav-link disabled"
      aria-disabled="true"
      on:click={() => goto(href)}
    >
      {text}
    </button>
  {:else if $page == href}
    <button
      class="nav-link active"
      aria-current="page"
      on:click={() => goto(href)}><strong>{text}</strong></button
    >
  {:else}
    <button class="nav-link" on:click={() => goto(href)}>{text}</button>
  {/if}
</li>
