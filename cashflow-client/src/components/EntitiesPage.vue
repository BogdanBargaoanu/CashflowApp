<template>
  <div id="entities">
    <h1 class="text-center entities-heading">Entities</h1>
    <div class="accordion" id="accordionEntity">
      <div v-for="(entity, index) in entities" :key="entity.idEntities" class="accordion-item entity-element"
        :style="{ animationDelay: index / 4 + 's' }">
        <!-- ACCORDION INFO -->
        <h2 class="accordion-header" id="headingOne" @click="openEntity(entity)">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            :data-bs-target="'#collapse' + entity.idEntities" aria-expanded="false"
            :aria-controls="'collapse' + entity.idEntities">
            Entity ID: {{ entity.idEntities }} &nbsp;
            Name: {{ entity.name }}
            User: {{ entity.isUser }}
          </button>
        </h2>

        <!-- ACCORDION BODY COLLAPSED -->
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
              <button v-if="showButton" @click="updateEntity(entity)" class="btn btn-primary">Update</button>
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
import axios from 'axios';

export default {
  name: 'EntitiesPage',
  data() {
    return {
      entities: [],

      // toast
      showToast: false,
      toastMessage: '',
      showButton: false,
      
      // current entity
      currentEntity: {
        idEntities: 0,
        name: '',
        isUser: false,
      },
    };
  },
  created() {
    this.getEntities();
  },
  methods: {
    logout() {
      localStorage.removeItem('user-token');
      this.$router.push('/login');
    },
    inputChanging() {
      this.showButton = true;
    },
    getEntities() {
      axios.get('http://localhost:3000/entities')
        .then(response => {
          this.entities = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    openEntity(entity) {
      if (this.currentEntity.idEntities == 0) {
        this.currentEntity = entity;
      } else {
        if (this.currentEntity.idEntities == entity.idEntities) {
          entity.name = this.currentEntity.name;
          console.log(entity);
          console.log(this.currentEntity);
          
          this.currentEntity = {
            idEntities: 0,
            name: '',
            isUser: false,
          };
        } else {
          this.currentEntity = entity;
        }
      }
      this.showButton = false;
    },
    updateEntity(entity) {
      axios.post(`http://localhost:3000/entities/updateEntity/${entity.idEntities}`, entity)
        .then(response => {
          if (response.data.message) {
            this.showToast = true;
            this.toastMessage = 'Entity updated successfully';
            this.showButton = false;
            setTimeout(() => {
              this.showToast = false;
            }, 5000);
            //this.getEntities();
          }

        })
        .catch(error => {
          this.showToast = true;
          this.toastMessage = error.response.data.error;
          this.showButton = false;
          setTimeout(() => {
            this.showToast = false;
          }, 5000);
        });
    },
  }
}
</script>

<style scoped>
.app-global {
  height: 90%;
}

#entities entity-element {
  width: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.entity-element {
  margin-bottom: 10px;
  animation: slide-up-fade-in 1s ease;
  animation-fill-mode: backwards;
  /* This makes the animation delay apply to the start of the animation, not the end */
}

.fade-enter-from,
.fade-leave-to {
  position: relative;
  width: 75%;
  display: block;
  margin: 3rem auto 2rem auto;
  border-radius: 1.5rem;
  background: linear-gradient(90deg, var(--background-color3) 0%, var(--background-color2) 35%, var(--background-color1) 100%);
  z-index: 1;
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  position: relative;
  width: 75%;
  display: block;
  margin: 3rem auto 2rem auto;
  border-radius: 1.5rem;
  background: linear-gradient(90deg, var(--background-color3) 0%, var(--background-color2) 35%, var(--background-color1) 100%);
  z-index: 1;
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  position: relative;
  width: 75%;
  display: block;
  margin: 3rem auto 2rem auto;
  border-radius: 1.5rem;
  background: linear-gradient(90deg, var(--background-color3) 0%, var(--background-color2) 35%, var(--background-color1) 100%);
  z-index: 1;
  transition: opacity 0.5s ease-in-out;
}
</style>