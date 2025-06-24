import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import giveIcon from "../assets/images/give.png"
import letterIcon from "../assets/images/letter.png"
import whatsAppIcon from "../assets/images/whatsapp.png"
import instagramIcon from "../assets/images/instagram.png"

const Participate = () => {
  const list = [
    {
      title: "Lees mee",
      img: letterIcon,
      action: "https://us14.campaign-archive.com/home/?u=60e75573cce9bfb257fcc1681&id=252490cba9",
    },
    {
      title: "Bid mee",
      img: whatsAppIcon,
      action: "https://rebrand.ly/bidvoorrolf",
    },
    {
      title: "Volg mij",
      img: instagramIcon,
      action: "https://www.instagram.com/rolfheij/",
    },
    {
      title: "Geef",
      img: giveIcon,
      action: "https://wycliffe.nl/doneren/?doel=Rolf%20Heij",
    },
  ];

  return (
    <Card className="no-scrollbar mb-10 w-11/12 p-4 lg:w-8/12 xl:w-7/12 2xl:w-6/12">
      <div className="flex flex-col items items-center text-center gap-2  mb-4 ml-4">
        <p className="text-4xl">Leef mee</p>
        <p>
          Jouw medeleven maakt een groot verschil!</p><p>
          Op deze manieren kun jij meehelpen om Gods Woord bij alle mensen te brengen:
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {list.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() => window.open(item.action, "_blank")}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="h-[140px] w-full object-contain p-5"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="justify-center text-small">
              <b>{item.title}</b>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default Participate;
