<script>
    export let text = "";
    export let event = () => {
        console.log("Ping");
    }
</script>

<button class="prime_btn" on:click={event}><p class="btn_text">{text}</p></button>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&display=swap');
    .prime_btn {
        background-color: #F23B0D;
        border-color: #F23B0D;
        border-radius: 10px;
        width: var(--width, fit-content);
        padding: 0px 16px;
        transition: background-color .3s, border-color .3s;
    }
    .btn_text {
        font-family: Epilogue, sans-serif;
        font-size: 16px;
        font-weight: 700;
        line-height: 21px;
        letter-spacing: 0.20999999344348907px;
        text-align: center;
        color: #FFFFFF;
    }
    .prime_btn:active {
        background-color: #c3300c;
        border-color: #c3300c;
    }
</style>