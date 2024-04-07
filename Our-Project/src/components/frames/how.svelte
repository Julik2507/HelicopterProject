<script>
    import Hint from "$comp/ui_kit/hint.svelte";
</script>

<p class="how__title">Как это работает?</p>
<div class="how__content">
    <Hint source="src/img/Hint1.png" text="Выбрать"/>
    <img class="how__arrow" src="src/img/Arrow.png" alt=""/>
    <Hint source="src/img/Hint2.png" text="Оплатить"/>
    <img class="how__arrow" src="src/img/Arrow.png" alt=""/>
    <Hint source="src/img/Hint3.png" text="Наслаждаться"/>
</div>

<style>
    .how__title {
        font-family: Epilogue, sans-serif;
        font-size: 22px;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: -0.33000001311302185px;
        text-align: left;
        color: #1C0F0D;
    }
    .how__content {
        display: flex;
        justify-content: space-between;
    }
    .how__arrow {
        height: 190px;
        margin-top: 40px;
    }
</style>