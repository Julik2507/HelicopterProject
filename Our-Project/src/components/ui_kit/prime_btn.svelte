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
        width: fit-content;
        padding: 0px 16px;
    }
    .btn_text {
        font-family: Epilogue, sans-serif;
        font-size: 14px;
        font-weight: 700;
        line-height: 21px;
        letter-spacing: 0.20999999344348907px;
        text-align: left;
        color: #FFFFFF;
    }
</style>