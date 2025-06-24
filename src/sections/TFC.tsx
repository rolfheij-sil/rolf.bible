import { Card, CardBody } from "@nextui-org/react";
import FlipCard from "../components/FlipCard";

const TFC = () => {
  return (
    <Card className="no-scrollbar mb-10 w-11/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12">
      <CardBody>
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="ml-10 flex h-72 w-64 justify-center">
            <FlipCard flipped onClickHandler={() => {}} />
          </div>
          <div className="m-4 inline-block align-middle">
            <p>Text</p>
            <header class="major">
							<h2>Thuisfrontcommissie</h2>
						</header>
						<p>Om mijn werk te ondersteunen is er een thuisfrontcommissie (TFC) opgezet. Deze groep mensen regelt alle randzaken rondom mijn werk, zodat ik me op het maken van software kan concentreren.<br />
						Heb je vragen over donaties, communicatie, gebed, of financiën? Neem dan contact op met Rick Nieuwland, secretaris van de TFC.</p>
						<ul class="actions special">
							<a href="mailto:tfc@biblico.de" class="button">Mail de TFC</a>
						</ul>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TFC;
