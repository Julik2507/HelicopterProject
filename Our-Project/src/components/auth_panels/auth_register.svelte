<script>
    let input_name = "";
    let input_email = "";
    let input_password = "";
</script>

<div class="register_panel">
    <h2>Register</h2>
    <input class="input_text" type="text" name="name" bind:value={input_name}/>
    <input class="input_text" type="text" name="email" bind:value={input_email}/>
    <input class="input_text" type="password" name="password" bind:value={input_password}/>
    <button class="input_btn">Log in</button>
</div>

<style>
    .register_panel {
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