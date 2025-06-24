import { Button, Card, CardBody, Switch } from "@nextui-org/react";
import FlipCard from "../components/FlipCard";
import { useState } from "react";

const AboutSoftware = () => {
  const [isPlatform, setIsPlatform] = useState<boolean>(false);

  const toggleApplication = () => {
    setApplication(!isPlatform);
  };

  const setApplication = (value: boolean) => {
    setIsPlatform(value);
  };

  return (
    <Card className="mb-10 w-11/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12">
      <CardBody>
        <div className="flex justify-center">
          <Button
            color="primary"
            variant="ghost"
            className="m-2"
            onClick={() => setApplication(false)}
          >
            Paratext
          </Button>
          <Switch
            defaultSelected
            size="lg"
            color="primary"
            isSelected={isPlatform}
            onValueChange={(value) => setIsPlatform(value)}
          ></Switch>
          <Button
            color="primary"
            variant="ghost"
            // className={`${!isPlatform && "animate-bounce"} m-2`}
            className={"m-2"}
            onClick={() => setApplication(true)}
          >
            Platform.Bible
          </Button>
        </div>
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="m-4 inline-block align-middle">
            {!isPlatform && <p>Paratext</p>}
            {isPlatform && <p>Platform.Bible</p>}
          </div>
          <div className="m-4 flex min-h-52 w-80 items-center justify-center">
            <FlipCard flipped={isPlatform} onClickHandler={toggleApplication} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default AboutSoftware;
