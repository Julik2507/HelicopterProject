<script>
    let input_email = "";
    let input_password = "";

    async function logIn() {
        
    }
</script>

<div class="login_panel">
    <h2>Login</h2>
    <input class="input_text" type="text" name="email" bind:value={input_email}/>
    <input class="input_text" type="text" name="password" bind:value={input_password}/>
    <button class="input_btn" on:click={logIn}>Log in</button>
</div>

<style>
    .login_panel {
        display: flex;
        flex-direction: column;
        width: 50%;
        gap: 6px;
    }
    .input_text {
        width: 30%;   
    }
    .input_btn {
        width: fit-content;
    }
</style>