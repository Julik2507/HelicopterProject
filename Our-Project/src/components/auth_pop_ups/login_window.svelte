<script>
    import { createEventDispatcher } from 'svelte';
    import { loginUser } from '$lib/Axios/authAxios'
    import PrimeBtn from '$comp/ui_kit/prime_btn.svelte';

    import cancelImg from "$lib/img/Cancel.svg";

    export let isModalOpen = false;

    let displayError = false;
    let message = "None";

    const dispatch = createEventDispatcher();

    function closeModal() {
        displayError = false;
        isModalOpen = false;
        dispatch('closeModal', { isModalOpen });
    }

    let input_email = "";
    let input_password = "";

    async function login() {
        try {
            await loginUser({
                password: input_password,
                email: input_email
            }).then(result => {console.log(result)});
            input_email = "";
            input_password = "";
            displayError = false;
            closeModal();
        } catch (err) {
            message = err.message;
            displayError = true;
        }
    }

    let passVisible = false;
    function changePasswordVisibility() {
        passVisible = !passVisible;
    }
</script>

<div id="background" style="--display: {isModalOpen ? 'flex' : 'none'};"></div>
<div id="modal" class="modal_body" style="--display: {isModalOpen ? 'flex' : 'none'};">
    <button class="modal_close" on:click={closeModal}><img src={cancelImg} alt="Close" style="width: 50px"></button>
    <p class="modal_title">Вход</p>
    <p class="modal_subtitle">Электронная почта</p>
    <input class="modal_input" type="text" name="email" placeholder="Введите электронную почту" bind:value={input_email}/>
    <p class="modal_subtitle">Пароль</p>
    {#if passVisible}
    <input class="modal_input" type="text" name="password" placeholder="Введите пароль" bind:value={input_password}/>
    {:else}
    <input class="modal_input" type="password" name="password" placeholder="Введите пароль" bind:value={input_password}/>
    {/if}
    <div class="modal_pass_visibility"><input class="modal_checkbox" type="checkbox" on:change={changePasswordVisibility}/><p class="modal_agreement">Показать пароль</p></div>
    {#if displayError}
    <p class="modal_error">{message}</p>
    {/if}
    <p class="modal_agreement">Входя в аккаунт, вы соглашаетесь с условиями использования и политикой конфиденциальности Вертолет.</p>
    <div class="modal_button">
        <PrimeBtn text="Войти" event={login} --width=400px/>
    </div>
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
        height: fit-content;
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
        font-size: 20px;
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
    .modal_error {
        font-family: Epilogue, sans-serif;
        font-size: 20px;
        font-weight: 500;
        line-height: 23px;
        letter-spacing: 0em;
        text-align: left;
        margin: 0;
        color: #E35959;
    }
    .modal_button {
        display: flex;
        width: 100%;
        justify-content: center;
    }
    @media (max-width: 1600px) {
        .modal_body {
            width: 500px;
            gap: 10px;
        }
        .modal_close {
            margin-left: 440px;
        }
        .modal_input {
            width: 480px;
            font-size: 16px;
        }
        .modal_title {
            font-size: 32px;
        }
        .modal_subtitle {
            font-size: 20px;
        }
        .modal_error, .modal_agreement {
            font-size: 16px;
        }
    }
</style>