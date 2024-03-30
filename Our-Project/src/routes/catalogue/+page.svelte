<script>
    import Header from "$comp/frames/header.svelte";
    import Footer from "$comp/frames/footer.svelte";
    import Product from "$comp/catalogue_items/product.svelte";
    import Category from "$comp/catalogue_items/category.svelte";
    import TabBtn from "$comp/ui_kit/tab_btn.svelte";
</script>

<Header type="catalogue"/>
<div class="catalogue__container">
    <div class="catalogue__categories">
        <Category/>
        <Category/>
        <Category/>
    </div>
    <div class="catalogue__items">
        <div class="items__tabs">
            <TabBtn/>
            <TabBtn/>
            <TabBtn/>
        </div>
        <div class="items__products">
            <Product/>
            <Product type="new"/>
            <Product type="missing"/>
            <Product type="sale"/>
        </div>
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
</style>