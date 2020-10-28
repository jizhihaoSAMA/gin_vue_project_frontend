<template>
  <div id="">
    <b-row>
      <b-card
        bg-variant="light"
        no-body
        class="col-md-3 col-lg-2"
      >
        <b-card-header
          header-tag="nav"
          no-body
        >
          <b-nav
            vertical
            class="w-35"
            pills
          >
            <b-nav-item
              href="?page=detail"
              :active="[undefined, 'detail'].includes($route.query.page)"
            >详细资料</b-nav-item>
            <b-nav-item
              href="?page=icon"
              :active="$route.query.page == 'icon'"
            >头像</b-nav-item>
            <b-nav-item
              href="?page=security"
              :active="$route.query.page == 'security'"
            >账号安全</b-nav-item>
          </b-nav>
        </b-card-header>

      </b-card>
      <b-card
        bg-variant="light"
        class="col-md-8 col-lg-9"
      >
        <detail v-if="[undefined, 'detail'].includes($route.query.page)" />
        <icon v-if="$route.query.page == 'icon'" />
        <security v-if="$route.query.page == 'security'" />
      </b-card>
    </b-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import icon from '@/components/layout/userProfile/UserIcon'
import security from '@/components/layout/userProfile/UserSecurity'
import detail from '@/components/layout/userProfile/UserDetailInfo'



export default {

  computed: mapState({
    userInfo: (state) => state.userModule.userInfo,
  }),
  components: {
    "icon": icon,
    "security": security,
    "detail": detail
  }
}
</script>