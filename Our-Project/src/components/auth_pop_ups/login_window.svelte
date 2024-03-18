<script>
    import { createEventDispatcher } from 'svelte';
    import { loginUser } from "$lib";
    import PrimeBtn from '$comp/ui_kit/prime_btn.svelte';
    
    export let isModalOpen = false;

    const dispatch = createEventDispatcher();

    function closeModal() {
        isModalOpen = false;
        dispatch('closeModal', { isModalOpen });
    }

    let input_email = "";
    let input_password = "";

    async function login() {
        await loginUser({
            password: input_password,
            email: input_email
        });
        input_email = "";
        input_password = "";
    }
</script>

<div id="background" style="--display: {isModalOpen ? 'flex' : 'none'};"></div>
<div id="modal" style="--display: {isModalOpen ? 'flex' : 'none'};">
    <input class="input_text" type="text" name="email" placeholder="Почта" bind:value={input_email}/>
    <input class="input_text" type="password" name="password" placeholder="Пароль" bind:value={input_password}/>
    <button class="input_btn" on:click={login}>Login</button>
    <button on:click={closeModal}>Close Modal</button>
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
        gap: 6px;
    }
    .input_btn {
        width: fit-content;
    }
</style>