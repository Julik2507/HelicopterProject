<script>
    import LoginPanel from "$comp/auth_panels/auth_login.svelte";
    import RegisterPanel from "$comp/auth_panels/auth_register.svelte";
</script>

<h1>Auth page</h1>
<div class="panels">
    <LoginPanel/>
    <RegisterPanel/>
</div>

<style>
    .panels {
        display: flex;
    }
</style>