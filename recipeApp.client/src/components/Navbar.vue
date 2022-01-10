<template>
  <nav
    class="
      navbar navbar-expand-lg navbar-dark
      bg-dark
      px-3
      border1
      border-4
      elevation-3
      d-flex
      justi
    "
  >
    <div class="selectable1" aria-label="Profile">
      <div v-show="user.isAuthenticated" class="ms-4">
        <div class="d-flex">
          <div class="d-flex flex-column">
            <h5 class="me-3 mb-0 text-white text-end">
              {{ account.name }}
            </h5>
            <p class="text-white me-3 mb-0 text-end">
              {{ account.email }}
            </p>
          </div>
          <img
            :src="account.picture"
            alt="user photo"
            height="50"
            width="50"
            class="picrounded elevation-2"
          />
        </div>
      </div>
    </div>
    <i
      v-if="user.isAuthenticated"
      @click="logout"
      class="
        mdi-18px
        selectable
        border border-dark border-3
        fs-5
        text-white
        p-1
        px-2
        pb-2
        me-4
      "
      title="logout"
      aria-describedby="logout"
    >
      Logout
    </i>
    <div v-else>
      <i
        v-show="!user.isAuthenticated"
        @click="login"
        class="
          mdi-18px
          selectable
          fs-5
          border border-dark border-3
          p-1
          px-2
          pb-2
          me-4
          text-light
        "
      >
        Login
      </i>
    </div>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed } from 'vue'
import { useRouter } from "vue-router"
export default {
  setup() {
    const router = useRouter()
    return {
      router,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        await AuthService.loginWithPopup()
        router.push({ name: 'Home' })
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
</style>
