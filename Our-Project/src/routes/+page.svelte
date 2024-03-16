<script>
    import Header from "$comp/frames/header.svelte";
    import Attract from "$comp/frames/attract.svelte";
    import How from "$comp/frames/how.svelte";
    import Footer from "$comp/frames/footer.svelte";
    import RegisterWindow from "$comp/auth_pop_ups/register_window.svelte";

    let isModalOpen = false;

    function openModal() {
        isModalOpen = true;
    }

    function closeModal() {
        isModalOpen = false;
    }
</script>

<button id="testBtn" on:click={openModal}>Shiny button</button>
<RegisterWindow isModalOpen={isModalOpen} on:closeModal={closeModal}/>

<Header/>
<Attract/>
<How/>
<Footer/>