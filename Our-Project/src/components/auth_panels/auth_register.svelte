<script>
    import { registerUser } from "$lib";

    let input_name = "";
    let input_email = "";
    let input_password = "";

    async function register() {
        await registerUser({
            name: input_name,
            password: input_password,
            email: input_email
        });
        input_name = "";
        input_email = "";
        input_password = "";
    }
</script>

<div class="register_panel">
    <h2>Register</h2>
    <input class="input_text" type="text" name="name" placeholder="Имя" bind:value={input_name}/>
    <input class="input_text" type="text" name="email" placeholder="Почта" bind:value={input_email}/>
    <input class="input_text" type="password" name="password" placeholder="Пароль" bind:value={input_password}/>
    <button class="input_btn" on:click={register}>Register</button>
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