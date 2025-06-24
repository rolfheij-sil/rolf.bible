import { Card, CardBody } from "@nextui-org/react";
import FlipCard from "../components/FlipCard";

const Wycliffe = () => {
  return (
    <Card className="no-scrollbar mb-10 w-11/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12">
      <CardBody>
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="m-4 inline-block align-middle">
            <p>Text</p>
          </div>
          <div className="mr-10 flex h-72 w-64 justify-center">
            <FlipCard flipped onClickHandler={() => {}} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Wycliffe;
