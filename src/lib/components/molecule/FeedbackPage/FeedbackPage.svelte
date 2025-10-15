<script lang="ts">
    interface Props {
        title: string;
        description: string;
        code?: string;
        links?: {
            label: string;
            href: string;
        }[];
    }
    let {
        title,
        description,
        code,
        links = [],
    }: Props = $props();

</script>

<main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center max-w-3xl">
      {#if code}
        <p class="text-base font-semibold text-primary">{code}</p>
      {/if}
      <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance  sm:text-7xl">{title}</h1>
      <p class="mt-6 text-lg font-medium text-pretty sm:text-xl/8">{description}</p>
      {#if links.length > 0}
        <div class="mt-10 flex items-center justify-center gap-x-6">
          {#each links as {href, label}, index (href)}
            {@const isCustomClass = links.length === 2 && index === 1}
            <a href={href} class={ isCustomClass ? "link link-hover" : "btn btn-primary" }>
              {label}
              {#if isCustomClass}
                <span aria-hidden="true"> &rarr;</span>
              {/if}
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </main>
  