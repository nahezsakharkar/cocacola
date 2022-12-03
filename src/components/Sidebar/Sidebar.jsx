function Sidebar() {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <a className="navbar-brand brand-logo-mini" href="index.html">
            <img src="../../images/logo-mini.svg" alt="logo" />
          </a>
          <a className="navbar-brand brand-logo" href="index.html">
            <img src="../../images/logo.svg" alt="logo" />
          </a>
        </li>
        <li className="nav-item">
          <div className="menu-heading mt-0">MAIN MENU</div>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="index.html">
            <i className="mdi mdi-locker-multiple menu-icon"></i>
            <span className="menu-title">Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="pages/widgets/widgets.html">
            <i className="mdi mdi-airplay menu-icon"></i>
            <span className="menu-title">Widgets</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#apps"
            aria-expanded="false"
            aria-controls="apps"
          >
            <i className="mdi mdi-television menu-icon"></i>
            <span className="menu-title">App Pages</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="apps">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/apps/email.html">
                  E-mail
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/apps/calendar.html">
                  Calendar
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/apps/todo.html">
                  Todo List
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/apps/gallery.html">
                  Gallery
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <div className="menu-heading">Interface</div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#ui-basic"
            aria-expanded="false"
            aria-controls="ui-basic"
          >
            <i className="mdi mdi-target menu-icon"></i>
            <span className="menu-title">Components</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <a
                  className="nav-link"
                  href="pages/ui-features/accordions.html"
                >
                  Accordions
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/ui-features/buttons.html">
                  Buttons
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/ui-features/badges.html">
                  Badges
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a
                  className="nav-link"
                  href="pages/ui-features/breadcrumbs.html"
                >
                  Breadcrumbs
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/ui-features/dropdowns.html">
                  Dropdowns
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/ui-features/modals.html">
                  Modals
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/ui-features/progress.html">
                  Progress bar
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a
                  className="nav-link"
                  href="pages/ui-features/pagination.html"
                >
                  Pagination
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/ui-features/tabs.html">
                  Tabs
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a
                  className="nav-link"
                  href="pages/ui-features/typography.html"
                >
                  Typography
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/ui-features/tooltips.html">
                  Tooltips
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/ui-features/dragula.html">
                  Dragula
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/ui-features/clipboard.html">
                  Clipboard
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a
                  className="nav-link"
                  href="pages/ui-features/context-menu.html"
                >
                  Context menu
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/ui-features/slider.html">
                  Sliders
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/ui-features/carousel.html">
                  Carousel
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/ui-features/colcade.html">
                  Colcade
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/ui-features/loaders.html">
                  Loaders
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#form-elements"
            aria-expanded="false"
            aria-controls="form-elements"
          >
            <i className="mdi mdi-bullhorn menu-icon"></i>
            <span className="menu-title">Forms</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="form-elements">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <a className="nav-link" href="pages/forms/basic_elements.html">
                  Basic Elements
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="pages/forms/advanced_elements.html"
                >
                  Advanced Elements
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/forms/validation.html">
                  Validation
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/forms/wizard.html">
                  Wizard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/forms/text_editor.html">
                  Text editors
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages/forms/code_editor.html">
                  Code editors
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#utilities"
            aria-expanded="false"
            aria-controls="utilities"
          >
            <i className="mdi mdi-scale-balance menu-icon"></i>
            <span className="menu-title">Utilities</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="utilities">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/ui-features/popups.html">
                  Popups
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a
                  className="nav-link"
                  href="pages/ui-features/notifications.html"
                >
                  Notifications
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <div className="menu-heading">Addons</div>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#charts"
            aria-expanded="false"
            aria-controls="charts"
          >
            <i className="mdi mdi-chart-bar menu-icon"></i>
            <span className="menu-title">Charts</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="charts">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/charts/chartjs.html">
                  ChartJs
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/charts/morris.html">
                  Morris
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/charts/flot-chart.html">
                  Flot
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/charts/google-charts.html">
                  Google charts
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/charts/sparkline.html">
                  Sparkline js
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/charts/c3.html">
                  C3 charts
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/charts/chartist.html">
                  Chartists
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/charts/justGage.html">
                  JustGage
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#tables"
            aria-expanded="false"
            aria-controls="tables"
          >
            <i className="mdi mdi-grid-large menu-icon"></i>
            <span className="menu-title">Tables</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="tables">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/tables/basic-table.html">
                  Basic table
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/tables/data-table.html">
                  Data table
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/tables/js-grid.html">
                  Js-grid
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/tables/sortable-table.html">
                  Sortable table
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#icons"
            aria-expanded="false"
            aria-controls="icons"
          >
            <i className="mdi mdi-emoticon menu-icon"></i>
            <span className="menu-title">Icons</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="icons">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/icons/flag-icons.html">
                  Flag icons
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/icons/font-awesome.html">
                  Font Awesome
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a
                  className="nav-link"
                  href="pages/icons/simple-line-icon.html"
                >
                  Simple line icons
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/icons/themify.html">
                  Themify icons
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#maps"
            aria-expanded="false"
            aria-controls="maps"
          >
            <i className="mdi mdi-map menu-icon"></i>
            <span className="menu-title">Maps</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="maps">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/maps/mapeal.html">
                  Mapeal
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/maps/vector-map.html">
                  Vector Map
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/maps/google-maps.html">
                  Google Map
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-toggle="collapse"
            href="#pages"
            aria-expanded="false"
            aria-controls="pages"
          >
            <i className="mdi mdi-file-document menu-icon"></i>
            <span className="menu-title">Pages</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="pages">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/samples/login.html">
                  {" "}
                  Login{" "}
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/samples/login-2.html">
                  {" "}
                  Login 2{" "}
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/samples/register.html">
                  {" "}
                  Register{" "}
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/samples/register-2.html">
                  {" "}
                  Register 2{" "}
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/samples/lock-screen.html">
                  {" "}
                  Lockscreen{" "}
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/samples/error-404.html">
                  {" "}
                  404{" "}
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/samples/error-500.html">
                  {" "}
                  500{" "}
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/samples/blank-page.html">
                  {" "}
                  Blank Page{" "}
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/samples/profile.html">
                  {" "}
                  Profile{" "}
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/samples/faq.html">
                  {" "}
                  FAQ{" "}
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/samples/faq-2.html">
                  {" "}
                  FAQ 2{" "}
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/samples/news-grid.html">
                  {" "}
                  News grid{" "}
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/samples/timeline.html">
                  {" "}
                  Timeline{" "}
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a
                  className="nav-link"
                  href="pages/samples/search-results.html"
                >
                  {" "}
                  Search Results{" "}
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/samples/portfolio.html">
                  {" "}
                  Portfolio{" "}
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/samples/invoice.html">
                  {" "}
                  Invoice{" "}
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/samples/pricing-table.html">
                  {" "}
                  Pricing Table{" "}
                </a>
              </li>
              <li className="nav-item">
                {" "}
                <a className="nav-link" href="pages/samples/orders.html">
                  {" "}
                  Orders{" "}
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="https://www.bootstrapdash.com/demo/steelui/docs/documentation.html"
          >
            <span className="menu-title documentation">Documentation</span>
          </a>
        </li>
        <div class="ps__rail-x" style={{ left: "0px", bottom: "0px" }}>
          <div
            class="ps__thumb-x"
            tabindex="0"
            style={{ left: "0px", width: "0px" }}
          ></div>
        </div>
        <div class="ps__rail-y" style={{top: "0px", height: "626px", right: "0px"}}>
          <div
            class="ps__thumb-y"
            tabindex="0"
            style={{top: "0px", height: "517px"}}
          ></div>
        </div>
      </ul>
    </nav>
  );
}

export default Sidebar;
