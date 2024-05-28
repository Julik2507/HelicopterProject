<script>
    import { createEventDispatcher, onMount } from 'svelte';

    import cancelImg from "$lib/img/Cancel.svg";

    export let isModalOpen = false;
    export let authError = false;
    export let msg = "";
    const dispatch = createEventDispatcher();

    function closeModal() {
        isModalOpen = false;
        dispatch('closeModal', { isModalOpen });
        if (authError) {
            window.location.href = "/";
        }
    }
</script>

<div id="background" style="--display: {isModalOpen ? 'flex' : 'none'};"></div>
<div id="modal" class="info_modal" style="--display: {isModalOpen ? 'flex' : 'none'};">
    <button class="modal_close" on:click={closeModal}><img src={cancelImg} alt="Close" style="width: 50px"></button>
    <p class="error_message">{msg}</p>
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
    .info_modal {
        width: 630px;
        height: fit-content;
        border-radius: 50px;
        padding: 50px;
        padding-top: 20px;
        gap: 20px;
    }
    .modal_close {
        width: 25px;
        border: none;
        padding: 0;
        float: right;
        margin-left: 570px;
        background: #fff;
    }
    .error_message {
        font-family: Epilogue, sans-serif;
        font-size: 20px;
        font-weight: 500;
        line-height: 23px;
        letter-spacing: 0em;
        text-align: center;
        margin: 0;
        color: #E35959;
    }
</style>