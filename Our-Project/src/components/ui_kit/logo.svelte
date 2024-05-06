<script>
    import logo from "$lib/img/Logo.png";

    function linkMain() {
        window.location.href = "/";
    }
</script>

<button on:click={linkMain} class="logo_btn">
    <img src={logo} alt="Logo"/>
</button>

<style>
    .logo_btn {
        background: none;
        border: none;
        padding: 0;
    }
</style>