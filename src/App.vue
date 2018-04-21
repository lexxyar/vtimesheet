<template>
  <div id="app">
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">vTimesheet</a>
      <!--<input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">-->
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#">Sign out</a>
        </li>
      </ul>
    </nav>


    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-3 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <!--<li class="nav-item">-->
              <!--<a class="nav-link active" href="#">-->
              <!--<span data-feather="home"></span>-->
              <!--Dashboard <span class="sr-only">(current)</span>-->
              <!--</a>-->
              <!--</li>-->

              <li class="nav-item">
                <router-link class="nav-link" to="/">
                  <i class="fas fa-users"></i>
                  Employees
                </router-link>
              </li>
            </ul>

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Positions</span>
            </h6>
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link class="nav-link" to="/Positionsfrs">
                  <i class="fas fa-chess-queen"></i>
                  Positions FRS
                </router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link" to="/Positions">
                  <i class="fas fa-chess"></i>
                  Positions
                </router-link>
              </li>
            </ul>

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Locations</span>
            </h6>
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link class="nav-link" to="/Regions">
                  <i class="fas fa-location-arrow"></i>
                  Regions
                </router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link" to="/Cities">
                  <i class="fas fa-map-marker"></i>
                  Cities
                </router-link>
              </li>
            </ul>

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Tarif</span>
            </h6>
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link class="nav-link" to="/Tarifnames">
                  <i class="far fa-list-alt"></i>
                  Tarif names
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/Tarifs">
                  <i class="far fa-money-bill-alt"></i>
                  Tarifs
                </router-link>
              </li>
            </ul>

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Tasks</span>
            </h6>
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link class="nav-link" to="/Tasks">
                  <i class="far fa-list-alt"></i>
                  Tasks
                </router-link>
              </li>
            </ul>

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Misc</span>
            </h6>
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link class="nav-link" to="/About">
                  <span data-feather="bar-chart-2"></span>
                  About
                </router-link>
              </li>
            </ul>

          </div>
        </nav>

        <main role="main" class="col-md-8 ml-sm-auto col-lg-9 pt-3 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {}
  }
</script>

