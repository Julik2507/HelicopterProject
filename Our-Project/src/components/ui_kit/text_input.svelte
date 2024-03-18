<script>
    let inputValue = "";
    export let placeholder = "";
</script>

<input class="text_input" type="text" bind:value={inputValue} {placeholder}/>

<style>
    .text_input {
        width: 610px;
        height: 63px;
        top: 202px;
        left: 36px;
        border-radius: 21px;
        border: 0;
        padding-left: 20px;
        background-color: #F5E8E8;
        color: #967878;
        font-size: 20px;
        font-weight: bold;
    }
</style>