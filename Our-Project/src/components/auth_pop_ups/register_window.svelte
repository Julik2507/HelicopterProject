<!-- src/Modal.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';

    export let isModalOpen = false;

    const dispatch = createEventDispatcher();

    function closeModal() {
        isModalOpen = false;
        dispatch('closeModal', { isModalOpen });
    }
</script>

<div id="background" style="--display: {isModalOpen ? 'block' : 'none'};"></div>
<div id="modal" style="--display: {isModalOpen ? 'block' : 'none'};">
    <p>This is a modal window.</p>
    <button on:click={closeModal}>Close Modal</button>
</div>

<style>
    #background {
        display: var(--display);
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
    }
</style>