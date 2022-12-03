function Dashboard() {
  return (
    <>
      <div className="row">
        <div className="col-md-6 col-lg-6 col-xl-3 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div className="icon-wrap">
                  <i className="mdi mdi-folder-outline"></i>
                </div>
                <div className="flex-right-height">
                  <p className="font-weight-bold mb-1">Total Collections</p>
                  <h2>12,456 k</h2>
                  <p className="font-weight-medium p-0">
                    <span className="text-success mr-2">+1.2%</span>
                    <span>Last month</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-3 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div className="icon-wrap">
                  <i className="mdi mdi-clipboard-text"></i>
                </div>
                <div className="flex-right-height">
                  <p className="font-weight-bold mb-1">Total Purchases</p>
                  <h2>45,383</h2>
                  <p className="font-weight-medium p-0">
                    <span className="text-success mr-2">+1.2%</span>
                    <span>growth</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-3 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div className="icon-wrap">
                  <i className="mdi mdi-file-document"></i>
                </div>
                <div className="flex-right-height">
                  <p className="font-weight-bold mb-1">Total People</p>
                  <h2>65,758</h2>
                  <p className="font-weight-medium p-0">
                    <span className="text-success mr-2">+1.2%</span>
                    <span>growth</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-3 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div className="icon-wrap">
                  <i className="mdi mdi-account-outline"></i>
                </div>
                <div className="flex-right-height">
                  <p className="font-weight-bold mb-1">Total People</p>
                  <h2>9,568</h2>
                  <p className="font-weight-medium p-0">
                    <span className="text-success mr-2">+1.2%</span>
                    <span>loss</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-lg-3 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Sales Today</h4>
              <h2>2.562</h2>
              <p className="font-weight-medium">
                <span className="text-success mr-2">8.35% </span>More earnings than
                usual
              </p>
              <div className="dashboard-chart-height mt-4">
                <canvas id="sales-today"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Pending Orders</h4>
              <h2>1389</h2>
              <p className="font-weight-medium">
                <span className="text-danger mr-2">-4.25% </span>Less orders than
                usual
              </p>
              <div className="dashboard-chart-height mt-4">
                <canvas id="pending-order"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Visitors Today</h4>
              <h2>17.212</h2>
              <p className="font-weight-medium">
                <span className="text-success mr-2">5.50% </span> More visitors than
                usual
              </p>
              <div className="dashboard-chart-height mt-4">
                <canvas id="visitors-today"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Total Earnings</h4>
              <h2>$24.300</h2>
              <p className="font-weight-medium">
                <span className="text-success mr-2">8.35% </span> More earnings than
                usual
              </p>
              <div className="dashboard-chart-height mt-4">
                <canvas id="total-earnings"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 grid-margin-0 grid-margin-lg">
          <div className="row">
            <div className="col-xl-6 grid-margin">
              <div className="card">
                <div className="card">
                  <div className="card-body p-0 text-center">
                    <div className="row">
                      <div className="col-sm-12">
                        <h4 className="card-title p-4">Support Cases</h4>
                        <div className="border-horizontal mb-3"></div>
                        <h2>235,200</h2>
                        <p>Ticket numbers</p>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-sm-5">
                              <p className="text-small">2.09% (30 days)</p>
                              <h3 className="text-info">2,42%</h3>
                              <p className="text-small font-weight-medium">
                                Open Tickets
                              </p>
                            </div>
                            <div className="col-sm-2 text-center">
                              <div className="border-vertical"></div>
                            </div>
                            <div className="col-sm-5">
                              <p className="text-small">0.51% (30 days)</p>
                              <h3 className="text-info">6.20%</h3>
                              <p className="text-small font-weight-medium">
                                Unsolved
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 grid-margin">
              <div className="card">
                <div className="card">
                  <div className="card-body p-0 text-center">
                    <div className="row">
                      <div className="col-sm-12">
                        <h4 className="card-title p-4">Today Statistics</h4>
                        <div className="border-horizontal mb-3"></div>
                        <h2>81240</h2>
                        <p>Transactions</p>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-sm-5">
                              <p className="text-small">2.00% (30 days)</p>
                              <h3 className="text-info">$256.1</h3>
                              <p className="text-small font-weight-medium">
                                Income
                              </p>
                            </div>
                            <div className="col-sm-2 text-center">
                              <div className="border-vertical"></div>
                            </div>
                            <div className="col-sm-5">
                              <p className="text-small">5.32% (30 days)</p>
                              <h3 className="text-info">$56.12</h3>
                              <p className="text-small font-weight-medium">
                                Outcome
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="card-title mb-0">Year's Total Revenue</h4>
                    <div
                      className="chart-legend-revenue"
                      id="chart-legend-revenue"
                    ></div>
                  </div>
                  <div className="chart-revenue-wrap">
                    <canvas id="total-revenue"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 grid-margin-0  grid-margin-lg">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="card-title">Product Sales</h4>
                    <div>
                      <div className="dropdown">
                        <button
                          className="btn btn-outline-light btn-sm dropdown-toggle text-dark text-small"
                          type="button"
                          id="dropdownMenuSizeButton3"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          30 Days
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuSizeButton3"
                        >
                          <h6 className="dropdown-header">20 Days</h6>
                          <a className="dropdown-item" href="#">
                            15 Days
                          </a>
                          <a className="dropdown-item" href="#">
                            10 Days
                          </a>
                          <a className="dropdown-item" href="#">
                            5 Days
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-chart-wrap">
                    <div
                      className="ct-chart product-chart"
                      id="ct-chart-stacked-bar"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 grid-margin-0 grid-margin-lg">
          <div className="row">
            <div className="col-sm-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title mb-3">Recent Transactions</h4>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Location</th>
                          <th>Sale Amount</th>
                          <th>Ernings</th>
                          <th>Graph</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <i
                              className="flag-icon flag-icon-us mr-2"
                              title="us"
                              id="us"
                            ></i>
                            United States
                          </td>
                          <td>16,08,084</td>
                          <td>16,08,084</td>
                          <td>
                            {" "}
                            <div className="chart-table-wrap">
                              <canvas id="table-chart-1"></canvas>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i
                              className="flag-icon flag-icon-es mr-2"
                              title="es"
                              id="es"
                            ></i>
                            Spain
                          </td>
                          <td>3,10,087</td>
                          <td>3,10,087</td>
                          <td>
                            {" "}
                            <div className="chart-table-wrap">
                              <canvas id="table-chart-2"></canvas>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i
                              className="flag-icon flag-icon-tr mr-2"
                              title="tr"
                              id="tr"
                            ></i>
                            Turkey
                          </td>
                          <td>2,50,908</td>
                          <td>2,50,908 </td>
                          <td>
                            {" "}
                            <div className="chart-table-wrap">
                              <canvas id="table-chart-3"></canvas>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i
                              className="flag-icon flag-icon-it mr-2"
                              title="it"
                              id="it"
                            ></i>
                            Italy
                          </td>
                          <td>2,33,185</td>
                          <td>2,33,185 </td>
                          <td>
                            {" "}
                            <div className="chart-table-wrap">
                              <canvas id="table-chart-4"></canvas>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i
                              className="flag-icon flag-icon-br mr-2"
                              title="br"
                              id="br"
                            ></i>
                            Brazil
                          </td>
                          <td>1,79,021</td>
                          <td>1,79,021 </td>
                          <td>
                            {" "}
                            <div className="chart-table-wrap">
                              <canvas id="table-chart-5"></canvas>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i
                              className="flag-icon flag-icon-gb mr-2"
                              title="gb"
                              id="gb"
                            ></i>
                            United Kingdom
                          </td>
                          <td>1,53,548</td>
                          <td>1,53,548</td>
                          <td>
                            {" "}
                            <div className="chart-table-wrap">
                              <canvas id="table-chart-6"></canvas>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i
                              className="flag-icon flag-icon-ph mr-2"
                              title="ph"
                              id="ph"
                            ></i>
                            Peru
                          </td>
                          <td>14,669</td>
                          <td>14,669</td>
                          <td>
                            {" "}
                            <div className="chart-table-wrap">
                              <canvas id="table-chart-7"></canvas>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <div className="d-xl-flex justify-content-between align-items-center">
                    <h4 className="card-title">Current Statement</h4>
                    <p className="font-weight-bold text-info">
                      Paid on May 11, 2020
                    </p>
                    <div className="dropdown">
                      <button
                        className="btn btn-outline-light btn-sm dropdown-toggle text-dark text-small"
                        type="button"
                        id="dropdownMenuSizeButtonstmt"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        30 Days
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuSizeButtonstmt"
                      >
                        <h6 className="dropdown-header">20 Days</h6>
                        <a className="dropdown-item" href="#">
                          15 Days
                        </a>
                        <a className="dropdown-item" href="#">
                          10 Days
                        </a>
                        <a className="dropdown-item" href="#">
                          5 Days
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="d-xl-flex justify-content-between mt-4">
                    <div>
                      <p className="text-muted">Card Limit</p>
                      <h3>$34,500.00</h3>
                    </div>
                    <div className="border-vertical height-fixed d-none d-lg-block"></div>
                    <div>
                      <p className="text-muted">Spend</p>
                      <h3>$27,221.21</h3>
                    </div>
                    <div className="border-vertical height-fixed d-none d-lg-block"></div>
                    <div>
                      <p className="text-muted">Minimum</p>
                      <h3>$7,331.94</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 grid-margin-0  grid-margin-lg">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="card-title">Newsletter Campaign</h4>
                    <div>
                      <div className="dropdown">
                        <button
                          className="btn btn-outline-light btn-sm dropdown-toggle text-dark text-small"
                          type="button"
                          id="dropdownMenuSizeButtonCampaign"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          30 Days
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuSizeButtonCampaign"
                        >
                          <h6 className="dropdown-header">20 Days</h6>
                          <a className="dropdown-item" href="#">
                            15 Days
                          </a>
                          <a className="dropdown-item" href="#">
                            10 Days
                          </a>
                          <a className="dropdown-item" href="#">
                            5 Days
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="news-letter-chart-wrap">
                    <canvas id="news-letter-chart"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
