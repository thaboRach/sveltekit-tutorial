<script lang="ts">
    type Post = {
        title: String;
        content: String;
    }
    export let data: {post: Post};
</script>

<h1>{data.post.title}</h1>
<div>{@html data.post.content}</div>