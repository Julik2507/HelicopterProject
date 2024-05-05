<script>
    import Hint from "$comp/ui_kit/hint.svelte";

    import hint1 from "$lib/img/Hint1.png";
    import hint2 from "$lib/img/Hint2.png";
    import hint3 from "$lib/img/Hint3.png";
    import arrow from "$lib/img/Arrow.png";
</script>

<p class="how__title">Как это работает?</p>
<div class="how__content">
    <Hint source={hint1} text="Выбрать"/>
    <img class="how__arrow" src={arrow} alt=""/>
    <Hint source={hint2} text="Оплатить"/>
    <img class="how__arrow" src={arrow} alt=""/>
    <Hint source={hint3} text="Наслаждаться"/>
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
        align-items: center;
        justify-content: space-between;
    }
    .how__arrow {
        height: 190px;
        margin-top: 40px;
    }
    @media (max-width: 1600px) {
        .how__arrow {
            height: 100px;
        }
    }
</style>