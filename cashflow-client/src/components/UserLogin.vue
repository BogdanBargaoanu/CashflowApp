<template>
  <div class="container-fluid">
    <form>
    <h1 class="text-center">{{ msg }}</h1>
      <div class="mb-3">
        <label for="inputUsername" class="form-label">Username</label>
        <input type="text" class="form-control" id="inputUsername">
      </div>
      <div class="mb-3">
        <label for="inputPassword" class="form-label">Password</label>
        <input type="password" class="form-control" id="inputPassword" aria-describedby="pwHelp">
        <div id="pwHelp" class="form-text">We'll never share your password with anyone else.</div>
      </div>
      <!--<div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div> -->
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  props: {
    msg: String
  }
}
</script>
