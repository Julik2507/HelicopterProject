<script>
    export let text = "";
    export let link = "/";
</script>

<a class="text_btn" href={link}>{text}</a>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&display=swap');
    .text_btn {
        font-family: Epilogue, sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0px;
        text-align: center;
        color: #876363;
    }
</style>