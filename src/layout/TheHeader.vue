<template>
	<header class="gnb">
    <div class="container-xl">
      <nav class="navbar navbar-expand-lg bg-body-tertiary py-3">
        <div class="container-fluid">
          <router-link class="navbar-brand" to="/">
            <h1>LeeKwanOh</h1>
          </router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" active-class="active" to="/"
                  >Main</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" active-class="active" to="/about"
                  >About</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  to="/portfolio"
                  >Portfolio</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" active-class="active" to="/lab"
                  >Lab</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" active-class="active" to="/bookmark"
                  >Bookmark</router-link
                >
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Study
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a
                      class="dropdown-item"
                      href="http://mylko72.gitbooks.io/git/"
                      target="_blank"
                      >Git</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="https://www.typescriptlang.org/"
                      target="_blank"
                      >Typescript</a
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
	</header>
</template>

<script setup></script>

<style lang="scss" scoped></style>
