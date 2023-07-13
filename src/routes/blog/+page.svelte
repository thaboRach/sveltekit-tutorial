<script lang="ts">
	type Summary = {
		slug: string,
		title: string
	}
	type Data = {
		summaries: Summary[]
	}

	export let data: Data;
</script>

<h1>blog</h1>

<ul>
	{#each data.summaries as {slug, title} }
	<li><a href="/blog/{slug}">{title}</a></li>
	{/each}
</ul>
