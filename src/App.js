import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [countryData, setCountryData] = useState();
  useEffect(() => {
    (async () => {
      let data = await fetch("https://covid-193.p.rapidapi.com/statistics", {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "c3ffeba565msha05d091de763f1bp1d8c3fjsnbd93b9f4b9b0",
          "x-rapidapi-host": "covid-193.p.rapidapi.com",
        },
      });
      let { response } = await data.json();
      console.log(response);
      response.sort((a, b) =>
        a.country > b.country ? 1 : b.country > a.country ? -1 : 0
      );
      setData(response);
    })();
  }, []);

  if (data.length && !countryData) {
    setCountryData(data[0]);
  }
  console.log("CountryData:", countryData);

  return (
    <div className="App">
      <div className="AppTitle">COVID TRACKER</div>
      {data.length && (
        <div>
          <div className="Global Section">
            <div className="GlobalSectionTitle">Global Statistics</div>
            <div className="GlobalSectionBody">
              <div className="GlobalDataBox">
                <div className="Title">Total</div>
                <div className="Total Figure">
                  {data.length
                    ? data.filter((item) => item.country === "All")[0].cases
                        .total
                    : "-"}
                </div>
              </div>
              <div className="GlobalDataBox">
                <div className="Title">Active</div>
                <div className="Active Figure">
                  {data.length
                    ? data.filter((item) => item.country === "All")[0].cases
                        .active
                    : "-"}
                </div>
              </div>
              <div className="GlobalDataBox">
                <div className="Title">Recovered</div>
                <div className="Recovered Figure">
                  {data.length
                    ? data.filter((item) => item.country === "All")[0].cases
                        .recovered
                    : "-"}
                </div>
              </div>
              <div className="GlobalDataBox">
                <div className="Title">Deaths</div>
                <div className="Death Figure">
                  {data.length
                    ? data.filter((item) => item.country === "All")[0].deaths
                        .total
                    : "-"}
                </div>
              </div>
            </div>
          </div>
          <div className="Country Section">
            <div className="CountrySectionTitle">Country Statistics</div>
            <div className="CountrySelector">
              <select
                onChange={(e) => setCountryData(data[e.target.value])}
                name="Countries"
                id="countryList"
              >
                {data.map((item, index) => (
                  <option key={index} value={index}>
                    {item.country}
                  </option>
                ))}
              </select>
            </div>

            <div className="Chart">
              {countryData && (
                <div className="PieChart">
                  <div className="ChartLegend">
                    <div className="Active Cases">
                      <div className="legendName">■ Active</div>
                      <div className="legendFigure">
                        {countryData.cases.active}
                      </div>
                    </div>
                    <div className="Recovered Cases">
                      <div className="legendName">■ Recovered</div>
                      <div className="legendFigure">
                        {countryData.cases.recovered}
                      </div>
                    </div>
                    <div className="Death Cases">
                      <div className="legendName">■ Death</div>
                      <div className="legendFigure">
                        {countryData.deaths.total}
                      </div>
                    </div>
                  </div>
                  <div className="PieChartContainer">
                    <Pie
                      legend={{ display: false }}
                      data={{
                        labels: ["Infected", "Recovered", "Deaths"],
                        datasets: [
                          {
                            weight: 20,
                            data: [
                              countryData.cases.active,
                              countryData.cases.recovered,
                              countryData.deaths.total,
                            ],
                            backgroundColor: ["#ffec3e", "#1f9aff", "#ff6c47"],
                            borderWidth: 0,
                          },
                        ],
                      }}
                    ></Pie>
                  </div>
                  <div className="ChartLegend">
                    <div className="Cases">
                      <div className="legendName">New Cases</div>
                      <div className="legendFigure">
                        {countryData.cases.new}
                      </div>
                    </div>
                    <div className="Cases">
                      <div className="legendName">New Deaths</div>
                      <div className="legendFigure">
                        {countryData.deaths.new}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
