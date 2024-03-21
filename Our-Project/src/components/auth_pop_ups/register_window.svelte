<script>
    import { createEventDispatcher } from 'svelte';
    import { registerUser } from "$lib";
    import PrimeBtn from '$comp/ui_kit/prime_btn.svelte';

    export let isModalOpen = false;

    const dispatch = createEventDispatcher();

    function closeModal() {
        isModalOpen = false;
        dispatch('closeModal', { isModalOpen });
    }

    let input_name = "";
    let input_email = "";
    let input_password = "";

    async function register() {
        try {
            await registerUser({
                name: input_name,
                password: input_password,
                email: input_email
            });
            input_name = "";
            input_email = "";
            input_password = "";
            closeModal();
        } catch (err) {
            alert(err);
        }
    }

    let passVisible = false;
    function changePasswordVisibility() {
        passVisible = !passVisible;
    }
</script>

<div id="background" style="--display: {isModalOpen ? 'flex' : 'none'};"></div>
<div id="modal" class="modal_body" style="--display: {isModalOpen ? 'flex' : 'none'};">
    <button class="modal_close" on:click={closeModal}><img src="src/img/Cancel.svg" alt="Close" style="width: 50px"></button>
    <p class="modal_title">Регистрация</p>
    <p class="modal_subtitle">Имя пользователя</p>
    <input class="modal_input" type="text" name="name" placeholder="Введите имя пользователя" bind:value={input_name}/>
    <p class="modal_subtitle">Электронная почта</p>
    <input class="modal_input" type="text" name="email" placeholder="Введите электронную почту" bind:value={input_email}/>
    <p class="modal_subtitle">Пароль</p>
    {#if passVisible}
    <input class="modal_input" type="text" name="password" placeholder="Введите пароль" bind:value={input_password}/>
    {:else}
    <input class="modal_input" type="password" name="password" placeholder="Введите пароль" bind:value={input_password}/>
    {/if}
    <div class="modal_pass_visibility"><input class="modal_checkbox" type="checkbox" on:change={changePasswordVisibility}/><p class="modal_agreement">Показать пароль</p></div>
    <p class="modal_agreement">Создавая аккаунт, вы соглашаетесь с условиями использования и политикой конфиденциальности Вертолет.</p>
    <PrimeBtn text="Зарегистрироваться" event={register} --width=630px/>
</div>

<style>
    #background {
        display: var(--display);
        background-color: rgba(100, 100, 100, 0.7);
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }
    #modal {
        display: var(--display);
        position: fixed;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        filter: drop-shadow(0 0 20px #333);
        flex-direction: column;
    }
    .modal_body {
        width: 630px;
        height: 760px;
        border-radius: 50px;
        padding: 50px;
        padding-top: 20px;
        gap: 20px;
    }
    .modal_title {
        font-family: Inter, sans-serif;
        font-size: 40px;
        font-weight: 800;
        line-height: 48px;
        letter-spacing: 0em;
        text-align: center;
        padding: 0;
        margin: 10px;
    }
    .modal_input {
        width: 610px;
        height: 63px;
        top: 202px;
        left: 36px;
        border-radius: 21px;
        border: 0;
        padding-left: 20px;
        background-color: #F5E8E8;
        color: #967878;
        font-size: 20px;
        font-weight: bold;
    }
    .modal_subtitle {
        font-family: Inter, sans-serif;
        font-size: 32px;
        font-weight: 400;
        line-height: 39px;
        letter-spacing: 0em;
        text-align: left;
        margin: 0;
    }
    .modal_close {
        width: 50px;
        border: none;
        padding: 0;
        float: right;
        margin-left: 580px;
        background: #fff;
    }
    .modal_agreement {
        font-family: Epilogue, sans-serif;
        font-size: 22px;
        font-weight: 500;
        line-height: 23px;
        letter-spacing: 0em;
        text-align: left;
        margin: 0;
        color: #967878;
    }
    .modal_pass_visibility {
        display: flex;
        align-items: center;
    }
    .modal_checkbox {
        width: 20px;
        height: 20px;
    }
</style>