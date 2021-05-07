<template>
  <div class="row">
    <div class="col s12 m6 l4 mb-3" v-for="n in 12">
      <a class="item" href="#" @click.prevent>
        <div class="item-img">
          <img
            src="https://items.s1.citilink.ru/805678_v01_b.jpg"
            alt=""
          />
          <p class="tag">SALE</p>
        </div>
        <div class="item-info">
          <div>
            <span class="price">
              <ins>12399</ins>
              <span class="sale">
                <del>24798</del>
                <span>50%</span>
              </span>
            </span>
          </div>
          <div class="item-name">
            <span>Монитор ASUS Portable MB168B 15.6", черный [90lm00i0-b01170]</span>
          </div>
          <div class="to-cart" style="">
            <a href="#" @click.prevent class="waves-effect waves-light btn red lighten-1"
              >В корзину</a
            >
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
