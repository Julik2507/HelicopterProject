<script>
    import TextBtn from "$comp/ui_kit/text_btn.svelte";
</script>

<div class="footer">
    <div class="footer__link">
        <TextBtn text="О нас" link="/"/>
        <TextBtn text="О нас" link="/"/>
        <TextBtn text="О нас" link="/"/>
        <TextBtn text="О нас" link="/"/>
    </div>
    <p class="footer__text">TODO: Вставить иконки</p>
    <p class="footer__text">© 2024 Вертолет</p>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&display=swap');
    .footer {
        width: 1920px;
        height: 137px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .footer__link {
        display: flex;
        flex-direction: row;
        width: 920px;
        justify-content: space-around;
    }
    .footer__text {
        font-family: Epilogue, sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0px;
        text-align: center;
        color: #876363;
        margin: 0;
        padding: 0;
    }
</style>