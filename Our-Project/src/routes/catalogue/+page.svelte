<script>
    import Header from "$comp/frames/header.svelte";
    import Footer from "$comp/frames/footer.svelte";
    import Product from "$comp/catalogue_items/product.svelte";
    import Category from "$comp/catalogue_items/category.svelte";
    import TabBtn from "$comp/ui_kit/tab_btn.svelte";

    import ProductInfo from "$comp/catalogue_items/product_info.svelte";
    import PrimeBtn from "$comp/ui_kit/prime_btn.svelte";
    let isInfoOpen = false;

    function UpdateInfo() {
        isInfoOpen = !isInfoOpen;
    }
    
    let current_category = "Хлеб и выпечка";
</script>

<ProductInfo isModalOpen={isInfoOpen} on:closeModal={UpdateInfo}/>
<PrimeBtn event={() => { isInfoOpen = true; }}/>
<Header type="catalogue"/>
<div class="catalogue__container">
    <div class="catalogue__categories">
        <Category/>
        <Category/>
        <Category/>
    </div>
    <div class="catalogue__items">
        <p class="items__title">{current_category}</p>
        <div class="items__tabs">
            <TabBtn/>
            <TabBtn/>
            <TabBtn/>
        </div>
        <p class="items__subtitle">Батон и белый хлеб</p>
        <div class="items__products">
            <Product/>
            <Product type="new"/>
            <Product type="missing"/>
            <Product type="sale"/>
        </div>
        <p class="items__subtitle">Серый и ржаной хлеб</p>
    </div>
</div>
<Footer/>

<style>
    .catalogue__container {
        display: flex;
        background-color: #F2F2F2;
        padding: 25px;
        gap: 10px;
    }
    .catalogue__categories {
        background-color: white;
        width: 490px;
        height: 675px;
        border-radius: 50px;
        padding-top: 25px;
        gap: 15px;
    }
    .catalogue__items {
        display: flex;
        flex-direction: column;
        background-color: white;
        width: 1400px;
        height: 650px;
        border-radius: 50px;
        padding: 25px;
    }
    .items__products {
        display: flex;
    }
    .items__title {
        font-family: Epilogue, sans-serif;
        font-size: 30px;
        font-weight: 700;
        line-height: 21px;
        letter-spacing: 0.21px;
        text-align: left;
    }
    .items__subtitle {
        font-family: Epilogue, sans-serif;
        font-size: 20px;
        font-weight: 700;
        line-height: 21px;
        letter-spacing: 0.21px;
        text-align: left;
    }
    .items__tabs {
        display: flex;
        gap: 25px;
    }
</style>