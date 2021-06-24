<template>
  <ul>
    <!-- LINKS -->
    <router-link
      v-for="link in links"
      :key="link.id"
      :to="{ name: link.route }"
      custom
      v-slot="{ navigate, href, isActive }"
    >
      <li>
        <collapse v-if="link.child" :title="link.title" :isActive="isActive">
          <!-- CHILDS -->
          <router-link
            v-for="child in link.child"
            :key="child.id"
            :to="{ name: child.route, query: { test: ['TEST', 'TEST2'] } }"
            custom
            v-slot="{ navigate, href, isActive }"
          >
            <li>
              <a
                :href="href"
                @click="navigate"
                class="collapse-header waves-effect waves-red"
                :class="isActive && 'active'"
                >{{ child.title }}
              </a>
            </li>
          </router-link>
        </collapse>
        <a
          v-else
          :href="href"
          @click="navigate"
          class="collapse-header waves-effect waves-red"
          :class="isActive && 'active'"
          >{{ link.title }}
        </a>
      </li>
    </router-link>
  </ul>
</template>
<script>
import Collapse from '@/components/Collapse.vue'

export default {
  name: 'admin-sidelayout',
  components: { Collapse },
  data: () => ({
    links: [
      { id: 0, title: 'Панель администратора', route: 'AdminDashboard' },
      { id: 1, title: 'Добавить товар', route: 'AdminItemsAdd' },
      { id: 2, title: 'Редактировать товар', route: 'AdminItemsEdit' },
      { id: 3, title: 'Редактировать категории', route: 'AdminCatsEdit' },
      { id: 4, title: 'Редактировать брэнды', route: 'AdminBrandsEdit' }
      // {
      //   id: 1, title: 'Управление товаром', route: 'AdminItems', child: [
      //     { id: 0, title: 'Добавить товар', route: 'AdminItemsAdd' },
      //     { id: 1, title: 'Редактировать товар', route: 'AdminItemsEdit' },
      //     { id: 2, title: 'Редактировать категории', route: 'AdminCatsEdit' },
      //     { id: 3, title: 'Редактировать брэнды', route: 'AdminBrandsEdit' }
      //   ]
      // },
      // { id: 2, title: 'Управление заказами', route: 'AdminOrder' },
      // { id: 3, title: 'Управление доступом', route: 'AdminRoles' }
    ]
  })
}
</script>