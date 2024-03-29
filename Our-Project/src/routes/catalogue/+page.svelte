<script>
    import Header from "$comp/frames/header.svelte";
    import Footer from "$comp/frames/footer.svelte";
    import Product from "$comp/catalogue_items/product.svelte";
</script>

<Header type="catalogue"/>
<div class="catalogue__container">
    <div class="catalogue__categories"></div>
    <div class="catalogue__items">
        <Product/>
        <Product type="new"/>
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
        height: 700px;
        border-radius: 50px;
    }
    .catalogue__items {
        display: flex;
        background-color: white;
        width: 1400px;
        height: 650px;
        border-radius: 50px;
        padding: 25px;
    }
</style>