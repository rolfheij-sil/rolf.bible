import { Card, CardBody, Slider, Tab, Tabs } from "@nextui-org/react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState } from "react";

const Thermometer = () => {
  const [selected, setSelected] = useState("photos");
  const [value, setValue] = useState(50);

  return (
    <Card className="no-scrollbar mb-10 w-11/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12">
      <CardBody>
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="m-4 inline-block w-3/4 align-middle">
            <Tabs
              className="flex justify-center md:justify-start"
              aria-label="Options"
              selectedKey={selected}
              onSelectionChange={(key) => setSelected(key.toString())}
            >
              <Tab key="photos" title="Photos">
                <Card>
                  <CardBody>
                    <Slider
                      label="Geld"
                      minValue={0}
                      maxValue={100}
                      value={value}
                      onChange={(newValue) => setValue(newValue as number)}
                    />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="music" title="Music">
                <Card>
                  <CardBody>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur.
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="videos" title="Videos">
                <Card>
                  <CardBody>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
          <div className="m-4 flex h-72 flex-col items-center">
            <PieChart
              series={[
                {
                  data: [
                    {
                      value: 3814,
                      label: "Periodiek (€3814 - 87%)",
                      color: "#2563eb",
                    },
                    {
                      value: 294,
                      label: "Eenmalig (€294 - 7%)",
                      color: "#14b8a6 ",
                    },
                    {
                      value: 280,
                      label: "Tekort (€280 - 6%)",
                      color: "#eb3225 ",
                    },
                  ],
                  innerRadius: 35,
                  outerRadius: 100,
                  paddingAngle: 3,
                  cornerRadius: 6,
                  startAngle: 0,
                  endAngle: 360,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -15,
                  },
                  cx: 95,
                },
              ]}
              height={200}
              width={200}
              slotProps={{ legend: { hidden: true } }}
            />
            <p className="text-3xl font-bold">Hallo</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Thermometer;
