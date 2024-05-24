<script>
    import Header from "$comp/frames/header.svelte";
    import Footer from "$comp/frames/footer.svelte";
    import Product from "$comp/catalogue_items/product.svelte";
    import Category from "$comp/catalogue_items/category.svelte";
    import { onMount } from "svelte";
    import { getGoods } from "$lib/Axios/goodsAxios";

    import { findGoodsInSearch } from "$lib/Axios/searchAxios";

    let current_category = 22;
    let current_name = "Хлеб";

    let products = [];
    let product_prices = [];

    let search_value = "";
    async function onSearch(event) {
        search_value = event.detail;
        if (search_value != "") {
            current_name = "Поиск по запросу " + search_value;
            products = [];
            product_prices = [];
            await findGoodsInSearch({letters: search_value}).then(result => {
                for (let i = 0; i < result.length; ++i) {
                    products.push(result[i].goods_id);
                    product_prices.push(result[i].price);
                }
            })
        }
        products = products;
    }

    async function getProducts(catID) {
        products = [];
        product_prices = [];
        await getGoods({type_id: catID}).then(result => {
            for (let i = 0; i < result.length; ++i) {
                products.push(result[i].goods_id);
                product_prices.push(result[i].price);
            }
        })
        products = products;
    }

    async function updateCategory(event) {
        current_name = event.detail.name;
        await getProducts(event.detail.catID);
        products = products;
    }

    onMount(async () => {
        await getProducts(current_category);
    })
</script>

<Header type="catalogue" on:search={onSearch}/>
<div class="catalogue__container">
    <div class="catalogue__categories">
        <Category catID=22 name="Хлеб" on:select_category={updateCategory}/>
        <Category catID=23 name="Выпечка" on:select_category={updateCategory}/>
        <Category catID=24 name="Овощи" on:select_category={updateCategory}/>
        <Category catID=25 name="Фрукты" on:select_category={updateCategory}/>
        <Category catID=26 name="Мясо" on:select_category={updateCategory}/>
        <Category catID=27 name="Рыба" on:select_category={updateCategory}/>
        <Category catID=28 name="Напитки" on:select_category={updateCategory}/>
        <Category catID=29 name="Сладкое" on:select_category={updateCategory}/>
        <Category catID=30 name="Снеки" on:select_category={updateCategory}/>
        <Category catID=31 name="Молоко, яйца, сыр" on:select_category={updateCategory}/>
        <Category catID=32 name="Для животных" on:select_category={updateCategory}/>
    </div>
    <div class="catalogue__items">
        <p class="items__title">{current_name}</p>
        <div class="items__products">
            {#each {length: products.length } as _, i}
                <Product prodID={products[i]} price={product_prices[i]}/>
            {/each}
        </div>
    </div>
</div>
<Footer/>

<style>
    .catalogue__container {
        display: flex;
        background-color: #F2F2F2;
        height: fit-content;
        padding: 25px;
        gap: 10px;
    }
    .catalogue__categories {
        background-color: white;
        width: 490px;
        height: fit-content;
        border-radius: 50px;
        padding-top: 25px;
        gap: 15px;
    }
    .catalogue__items {
        display: flex;
        flex-direction: column;
        background-color: white;
        width: 1400px;
        height: fit-content;
        border-radius: 50px;
        padding: 25px;
    }
    .items__products {
        display: flex;
        flex-wrap: wrap;
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