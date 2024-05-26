<template>
  <div id="entities">
    <h1 class="text-center entities-heading">Entities</h1>
    <div class="accordation" id="accordationEntities">
      <div v-for="(entity, index) in entities" :key="entity.idEntities" class="accordation-item entity-element"
        :style="{ animationDelay: index / 4 + 's' }">
        <!-- ACCORDATION INFO -->
        <h2 class="accordion-header" id="headingOne" @click="openEntity(log)">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            :data-bs-target="'#collapse' + entity.idEntities" aria-expanded="false"
            :aria-controls="'collapse' + entity.idEntities">
            Entity ID: {{ entity.idEntities }} &nbsp;
            Name: {{ entity.name }}
            User: {{ entity.isUser }}
          </button>
        </h2>

        <!-- ACCORDATION BODY COLLAPSED -->
        <div :id="'collapse' + entity.idEntities" class="accordion-collapse collapse"
          :aria-labelledby="'heading' + entity.idEntities" data-bs-parent="#accordionEntity">
          <div class="accordion-body">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
              </div>
              <input :id="'name' + entity.idEntities" type="text" class="value-input form-control" aria-label="Name"
                aria-describedby="input-Group-sizing-default" v-model="entity.name" @change="inputChanging()">
            </div>
            <transition name="fade">
              <button v-if="showButton" @click="updateCashflowLog(log)" class="btn btn-primary">Update</button>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>

  <button @click="logout()" class="btn-logout"> <i class="fa-solid fa-right-from-bracket"></i> Logout</button>
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true"
    :class="{ 'show': showToast }" style="position: absolute; top: 0; right: 0;">
    <div class="toast-header">
      <strong class="me-auto">Notification</strong>
      <button type="button" class="m1-2 mb-1 btn-close fade-in" @click="showToast = false"></button>
    </div>
    <div class="toast-body">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'EntitiesPage',
  data() {
    return {
      entities: [],

      // toast
      showToast: false,
      toastMessage: '',
      showButton: false,
    };
  },
}
</script>