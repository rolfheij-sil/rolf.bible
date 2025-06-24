import { Card, CardBody, CardHeader } from "@nextui-org/react";

import Deck from "../components/Deck";

const AboutMe = () => {
  return (
    <Card className="no-scrollbar mb-10 w-11/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12">
      <CardHeader className="flex-col items-start bg-none px-4 pb-0 pt-2">
        <p className="text-tiny font-bold uppercase">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="text-large font-bold">Over mij</h4>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col-reverse items-center justify-between md:flex-row">
          <div className="m-4 inline-block align-middle">
            <p>Text</p>
          </div>
          <div className="m-10 flex h-80 w-64 items-center justify-center">
            <Deck />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default AboutMe;
