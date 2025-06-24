import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import Globe from "react-globe.gl";
import type { GlobeMethods } from "react-globe.gl";
// import secrets from "../assets/secrets.json";
// import peopleGroups from "../assets/peopleGroups.json";
// import languages from "../assets/languages.json";
import rolf from "./../assets/images/rolf.png";
import peopleDataJson from "../assets/peopleData.json";
import languageDataJson from "../assets/languageData.json";

// const API_BASE_URL: string = "https://joshuaproject.net/api/v2";

// const FORCE_API_CALLS: boolean = true;

// We know that the total amount of pages to be fetched from Joshua Project is currently 8
// and that this is not likely to change in the near future.
// const TOTAL_PAGE_COUNT: number = 8;

const CURRENT_YEAR: number = new Date().getFullYear();

// const PRODUCTION: boolean = process.env.NODE_ENV === "production";

// const requestOptions: RequestInit = {
//   method: "GET",
//   redirect: "follow",
// };

interface PeopleGroup {
  PrimaryLanguageName: string;
  BibleStatus: number;
  Latitude: number;
  Longitude: number;
  NaturalName: string;
  Ctry: string;
  Population: number;
  Continent: string;
  PeopleID3: number;
  ROG3: string;
}

const peopleDataTyped: PeopleGroup[] = peopleDataJson as PeopleGroup[];

interface Language {
  Language: string;
  BibleStatus: number;
  Speakers: number | null;
  BibleYear: number | string;
  NTYear: number | string;
  PortionsYear: number | string;
}

const languageDataTyped: Language[] = languageDataJson as Language[];

interface GlobePointData {
  lat: number;
  lng: number;
  name: string;
  color: string;
  radius: number;
  peopleId: number;
  ROG3: string;
}

interface GlobeLabelData {
  lat: number;
  lng: number;
  label: string;
  color: string;
}

const labelsData: GlobeLabelData[] = [
  {
    lat: 51.9144,
    lng: 4.5962,
    label: "Krimpen aan\n  den IJssel",
    color: "#ffffff",
  },
  {
    lat: 34.8638,
    lng: -80.7459,
    label: "Waxhaw",
    color: "#ffffff",
  },
];

interface GlobeArcData {
  startLat: number;
  endLat: number;
  startLng: number;
  endLng: number;
  color: string[];
}

const arcsData: GlobeArcData[] = [
  {
    startLat: 51.9144,
    endLat: 34.8638,
    startLng: 4.5962,
    endLng: -80.7459,
    color: ["#14b8a6", "#14b8a6"],
  },
];

// const callAPI = async (endpoint: string, fields: string, page: number) => {
//   if (PRODUCTION || FORCE_API_CALLS) {
//     const response = await fetch(
//       `${API_BASE_URL}/${endpoint}?api_key=${secrets.joshua_project_api_key}&BibleStatus=1|2|3|4|5&limit=3000&fields=${fields}&page=${page}`,
//       requestOptions,
//     );
//     return await response.json();
//   } else {
//     if (endpoint === "people_groups") {
//       return peopleGroups;
//     } else if (endpoint === "languages") {
//       return languages;
//     }
//   }
// };

const BiblePoverty = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const [globePointData, setGlobePointData] = useState<GlobePointData[]>([]);
  const [peopleData, setPeopleData] = useState<PeopleGroup[]>([]);
  const [languageData, setLanguageData] = useState<Language[]>([]);
  // const [pagesLoaded, setPagesLoaded] = useState<number>(0);

  const [filter, setFilter] = useState<string>("1|2");

  const [tab, setTab] = useState<number>(1);
  const [tabContent, setTabContent] = useState<ReactNode>();

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  const globeRef = useRef<GlobeMethods>(null);

  // useEffect(() => {
  //   const collectData = async () => {
  //     let pagesLoadedSoFar: number = 0;
  //     setPeopleData(
  //       (await fetchData(
  //         pagesLoadedSoFar,
  //         "people_groups",
  //         "PrimaryLanguageName|BibleStatus|Latitude|Longitude|NaturalName|Ctry|Population|Continent|PeopleID3|ROG3",
  //       )) as PeopleGroup[],
  //     );
  //     pagesLoadedSoFar = 6;
  //     setLanguageData(
  //       (await fetchData(
  //         pagesLoadedSoFar,
  //         "languages",
  //         "Language|BibleStatus|BibleYear|NTYear|PortionsYear|Speakers",
  //       )) as Language[],
  //     );
  //   };

  //   const fetchData = async (
  //     pagesLoadedSoFar: number,
  //     endpoint: string,
  //     fields: string,
  //   ) => {
  //     let page: number = 0;
  //     let pages: number = 1;
  //     let temporaryData: (PeopleGroup | Language)[] = []; // Try to make this a generic type
  //     while (page < pages) {
  //       page += 1;
  //       const data = await callAPI(endpoint, fields, page);
  //       if (data.status.status_code === 200) {
  //         pages = data.meta.pagination.total_pages;
  //         temporaryData = temporaryData.concat(data.data);
  //         setPagesLoaded((pagesLoadedSoFar += 1));
  //       }
  //     }
  //     return temporaryData;
  //   };

  //   collectData().catch(console.error);
  // }, []);

  useEffect(() => {
    setPeopleData(peopleDataTyped);
    setLanguageData(languageDataTyped);
  }, []);

  const formatNumber = (value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const peopleToGo: string = useMemo(() => {
    let populationCount = 0;
    const selectedPeopleData = peopleData.filter(
      (peopleGroup) => peopleGroup.BibleStatus !== 5
    );
    selectedPeopleData.forEach((peopleGroup: PeopleGroup) => {
      populationCount += peopleGroup.Population;
    });
    return formatNumber(populationCount);
  }, [peopleData]);

  const recentlyCompletedTranslations: Language[] = useMemo(() => {
    const recentYear = (year: string | number): boolean => {
      if (typeof year === "number") {
        return year === CURRENT_YEAR || year === CURRENT_YEAR - 1
          ? true
          : false;
      } else if (typeof year === "string") {
        return year.includes(`-${CURRENT_YEAR.toString()}`) ||
          year.includes(`-${(CURRENT_YEAR - 1).toString()}`)
          ? true
          : false;
      }
      return false;
    };

    let recentlyCompleted: Language[] = [];
    recentlyCompleted = recentlyCompleted.concat(
      languageData.filter((language) => recentYear(language.BibleYear))
    );
    recentlyCompleted = recentlyCompleted.concat(
      languageData.filter((language) => recentYear(language.NTYear))
    );
    recentlyCompleted = recentlyCompleted.concat(
      languageData.filter((language) => recentYear(language.PortionsYear))
    );

    return recentlyCompleted;
  }, [languageData]);

  const recentlyReachedPeopleGroups: PeopleGroup[] = useMemo(() => {
    let peopleGroups: PeopleGroup[] = [];
    recentlyCompletedTranslations.forEach((language) => {
      peopleGroups = peopleGroups.concat(
        peopleData.filter(
          (peopleGroup) => peopleGroup.PrimaryLanguageName === language.Language
        )
      );
    });
    return peopleGroups;
  }, [peopleData, recentlyCompletedTranslations]);

  const getColor = (bibleStatus: number): string => {
    if (bibleStatus === 1 || bibleStatus === 2) return "#f31260";
    else if (bibleStatus === 3) return "#f5a524";
    else if (bibleStatus === 4) return "#5c6ac4";
    else if (bibleStatus === 5) return "#17c964";
    throw new Error(`Unexpected BibleStatus: ${bibleStatus.toString()}`);
  };

  const focusGlobe = (
    lat: number,
    lng: number,
    transitionTime = 1000,
    altitude = 2.5
  ) => {
    if (!globeRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    globeRef.current.pointOfView({ lat, lng, altitude }, transitionTime);
  };

  const goToJoshuaProjectPage = (dataPoint: GlobePointData) => {
    window.open(
      `https://joshuaproject.net/people_groups/${dataPoint.peopleId.toString()}/${
        dataPoint.ROG3
      }`,
      "_blank"
    );
  };

  useEffect(() => {
    if (!globeRef.current) return;
    if (tab === 5) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      globeRef.current.controls().autoRotate = true;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      globeRef.current.controls().autoRotateSpeed = -0.35;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      globeRef.current.controls().autoRotate = false;
    }
  }, [tab]);

  useEffect(() => {
    if (tab === 1) {
      const selectedPeopleData: PeopleGroup[] = peopleData.filter(
        (peopleGroup) =>
          peopleGroup.BibleStatus === 1 || peopleGroup.BibleStatus === 2
      );
      const selectedGlobePointData: GlobePointData[] = selectedPeopleData.map(
        (peopleGroup: PeopleGroup) => ({
          lat: peopleGroup.Latitude,
          lng: peopleGroup.Longitude,
          name: `${peopleGroup.NaturalName} (${peopleGroup.Ctry})`,
          color: getColor(peopleGroup.BibleStatus),
          radius: 0.3,
          peopleId: peopleGroup.PeopleID3,
          ROG3: peopleGroup.ROG3,
        })
      );
      setGlobePointData(selectedGlobePointData);
      focusGlobe(-3.32093, 127.56446, 2000, 1.8);
      setTabContent(`De hele Bijbel is op dit moment beschikbaar in ${languageData
        .filter((language) => language.BibleStatus === 5)
        .length.toString()} talen!\n
        Maar wereldwijd zijn er nog ${languageData
          .filter((language) => language.BibleStatus !== 5)
          .length.toString()} talen waarin geen complete Bijbel beschikbaar is.\
        Dat betekent dat er nog ${peopleToGo} mensen wachten op Gods Woord in de taal van hun hart!\
        Veel van deze taalgroepen bevinden zich in Azië. Alleen al in Papoea-Nieuw-Guinea zijn er ${peopleData
          .filter(
            (peopleGroup) =>
              peopleGroup.Ctry === "Papua New Guinea" &&
              peopleGroup.BibleStatus !== 5
          )
          .length.toString()} talen waarin geen complete Bijbel beschikbaar is.`);
    } else if (tab === 2) {
      const selectedPeopleData: PeopleGroup[] = peopleData.filter(
        (peopleGroup) =>
          peopleGroup.BibleStatus === 1 || peopleGroup.BibleStatus === 2
      );
      setGlobePointData(
        selectedPeopleData.map((peopleGroup: PeopleGroup) => ({
          lat: peopleGroup.Latitude,
          lng: peopleGroup.Longitude,
          name: `${peopleGroup.NaturalName} (${peopleGroup.Ctry})`,
          color: getColor(peopleGroup.BibleStatus),
          radius: 0.3,
          peopleId: peopleGroup.PeopleID3,
          ROG3: peopleGroup.ROG3,
        }))
      );
      focusGlobe(4.9226, 19.4076, 2000, 1.8);
      const africanPeopleGroupsToGo = peopleData.filter(
        (peopleGroup) =>
          peopleGroup.Continent === "Africa" && peopleGroup.BibleStatus !== 5
      );
      let africanPeopleToGo = 0;
      africanPeopleGroupsToGo.forEach((peopleGroup) => {
        africanPeopleToGo += peopleGroup.Population;
      });
      setTabContent(`Ook in Afrika is Bijbelarmoede nog een groot probleem.\n
      Op dat continent zijn nu nog ${africanPeopleGroupsToGo.length.toString()} groepen mensen die op Gods Woord wachten.\
      Dat zijn in totaal ${formatNumber(africanPeopleToGo)} mensen!\n
      Wycliffe Bijbelvertalers is één van de vele organisaties die dit probleem op willen lossen.\
      Het grote doel is: Iedereen een Bijbel in de taal van z'n hart!`);
    } else if (tab === 3) {
      setGlobePointData([]);
      focusGlobe(51.9144, 4.5962, 2000, 0.7);
      setTabContent(
        <div className="flex flex-col">
          {`Mijn naam is Rolf Heij, en als software-ontwikkelaar mag ik aan dit grote doel bijdragen. Vanuit huis, in Krimpen aan\
          den IJssel, werk ik aan computerprogramma's die ervoor zorgen dat het vertalen van de Bijbel steeds sneller en beter gaat.`}

          <img className="mt-4 w-full rounded-lg" src={rolf} alt="Rolf" />
        </div>
      );
    } else if (tab === 4) {
      setGlobePointData([]);
      focusGlobe(34.8638, -80.7459, 2000, 0.7);
      setTabContent(`Dat werk doe ik niet alleen. Ons team van software-ontwikkelaars is over de hele wereld verspreid.\
      Het grootste deel van mijn collega's woont in Amerika, en om die reden ben ik daar ook regelmatig te vinden.\n
      Dan werk en verblijf ik in Waxhaw (North Carolina). Ook bezoek ik conferenties in die regio\
      waar software-ontwikkelaars en andere techneuten kennis uitwisselen om zo de wereldwijde\
      Bijbel-vertaal-beweging nog beter van dienst te kunnen zijn!`);
    } else if (tab === 5) {
      focusGlobe(7.9808, 20.8151, 2000, 1.8);
      setGlobePointData(
        recentlyReachedPeopleGroups.map((peopleGroup: PeopleGroup) => ({
          lat: peopleGroup.Latitude,
          lng: peopleGroup.Longitude,
          name: `${peopleGroup.NaturalName} (${peopleGroup.Ctry})`,
          color: getColor(peopleGroup.BibleStatus),
          radius: 0.8,
          peopleId: peopleGroup.PeopleID3,
          ROG3: peopleGroup.ROG3,
        }))
      );
      setTabContent(
        `Er wordt dus hard gewerkt aan het beëindigen van Bijbelarmoede.\n
        Alleen al in ${CURRENT_YEAR.toString()} en ${(
          CURRENT_YEAR - 1
        ).toString()} werden er al ${recentlyCompletedTranslations.length.toString()} nieuwe talen bereikt!\
        In ${recentlyCompletedTranslations
          .filter((language) => language.BibleStatus === 5)
          .length.toString()} talen werd een complete Bijbel uitgegeven.\
        ${recentlyCompletedTranslations
          .filter((language) => language.BibleStatus === 4)
          .length.toString()} talen ontvingen een vertaling van het Nieuwe Testament,\
        en ${recentlyCompletedTranslations
          .filter((language) => language.BibleStatus === 3)
          .length.toString()} talen kregen één of meerdere Bijbelboeken.\n
        Ik ben dankbaar dat ik hieraan een kleine bijdrage mag leveren! Wil je weten hoe ik dat doe, en hoe jij ook kunt helpen?\
        Hou deze website dan in de gaten. Er volgt snel meer info!\n
        Wil je nog even met de wereldbol spelen? Ga dan naar het volgende tabblad!`
      );
    } else if (tab === 6) {
      const selectedPeopleData: PeopleGroup[] = peopleData.filter(
        (peopleGroup) =>
          filter.split("|").flat().includes(peopleGroup.BibleStatus.toString())
      );
      setGlobePointData(
        selectedPeopleData.map((peopleGroup: PeopleGroup) => ({
          lat: peopleGroup.Latitude,
          lng: peopleGroup.Longitude,
          name: `${peopleGroup.NaturalName} (${peopleGroup.Ctry})`,
          color: getColor(peopleGroup.BibleStatus),
          radius: 0.3,
          peopleId: peopleGroup.PeopleID3,
          ROG3: peopleGroup.ROG3,
        }))
      );
      setTabContent(
        <div className="flex flex-col">
          <p>{`Wil je weten waar de Bijbel wel of niet beschikbaar is? Gebruik dit filter om het op de wereldbol te bekijken.`}</p>
          <div className="mb-4 mt-4 flex flex-col items-start">
            <h3 className="mb-3 text-lg font-semibold">
              Beschikbaarheid van de Bijbel
            </h3>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="bible-filter"
                  className="radio radio-error"
                  value="1|2"
                  checked={filter === "1|2"}
                  onChange={(event) => {
                    setFilter(event.target.value);
                  }}
                />
                <span className="label-text ml-2">
                  {`Helemaal niets (${languageData
                    .filter(
                      (language) =>
                        language.BibleStatus === 1 || language.BibleStatus === 2
                    )
                    .length.toString()} talen)`}
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="bible-filter"
                  className="radio radio-warning"
                  value="3"
                  checked={filter === "3"}
                  onChange={(event) => {
                    setFilter(event.target.value);
                  }}
                />
                <span className="label-text ml-2">
                  {`Stukjes (${languageData
                    .filter((language) => language.BibleStatus === 3)
                    .length.toString()} talen)`}
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="bible-filter"
                  className="radio radio-primary"
                  value="4"
                  checked={filter === "4"}
                  onChange={(event) => {
                    setFilter(event.target.value);
                  }}
                />
                <span className="label-text ml-2">
                  {`Nieuwe Testament (${languageData
                    .filter((language) => language.BibleStatus === 4)
                    .length.toString()} talen)`}
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="bible-filter"
                  className="radio radio-success"
                  value="5"
                  checked={filter === "5"}
                  onChange={(event) => {
                    setFilter(event.target.value);
                  }}
                />
                <span className="label-text ml-2">
                  {`De hele Bijbel (${languageData
                    .filter((language) => language.BibleStatus === 5)
                    .length.toString()} talen)`}
                </span>
              </label>
            </div>
          </div>
        </div>
      );
    }
  }, [
    filter,
    languageData,
    peopleData,
    peopleToGo,
    recentlyCompletedTranslations,
    recentlyReachedPeopleGroups,
    tab,
  ]);

  return (
    <div className="card shadow-xl no-scrollbar mb-10 w-11/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12">
      {/* {(PRODUCTION || FORCE_API_CALLS) && pagesLoaded < TOTAL_PAGE_COUNT ? (
        <div className="card-body flex items-center">
          <CircularProgress label="Voortgang Bijbelvertaalwerk Laden..." />
          <Progress
            className="mb-2 mt-2 max-w-md"
            aria-label="Laden..."
            value={(pagesLoaded / TOTAL_PAGE_COUNT) * 100}
          />
        </div>
      ) : ( */}
      <>
        <div className="card-header flex-col items-center bg-none px-4 pb-0 pt-2"></div>
        <div className="card-body">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center">
                <Globe
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                  ref={globeRef as any}
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                  backgroundColor="#ffffff"
                  atmosphereColor="#000000"
                  width={isMobile ? 300 : 400}
                  height={isMobile ? 300 : 400}
                  labelsData={tab === 3 || tab === 4 ? labelsData : []}
                  labelLat={"lat"}
                  labelLng={"lng"}
                  labelText={"label"}
                  labelColor={"color"}
                  labelSize={3}
                  labelDotRadius={0.75}
                  labelResolution={3}
                  arcsData={tab === 4 ? arcsData : []}
                  arcStartLat={"startLat"}
                  arcEndLat={"endLat"}
                  arcStartLng={"startLng"}
                  arcEndLng={"endLng"}
                  arcColor={"color"}
                  arcAltitude={0.18}
                  arcDashLength={0.1}
                  arcDashGap={0.05}
                  arcDashAnimateTime={5000}
                  pointsData={globePointData}
                  pointColor={"color"}
                  pointAltitude={0.01}
                  pointRadius={"radius"}
                  pointsMerge={isMobile ? true : false}
                  pointsTransitionDuration={0}
                  onPointClick={(point) => {
                    goToJoshuaProjectPage(point as GlobePointData);
                  }}
                  onGlobeReady={() => {
                    focusGlobe(-3.32093, 127.56446, 0, 1.8);
                  }}
                />
              </div>
            </div>
            <div className="ml-4 mr-4 mt-4 flex flex-col items-center justify-between md:mt-0 md:min-h-96 md:items-end">
              <div className="flex whitespace-pre-line text-center md:text-justify">
                {tabContent}
              </div>{" "}
              <div className="join mt-4">
                {Array.from({ length: 6 }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    className={`join-item btn ${
                      tab === pageNum ? "btn-active" : ""
                    }`}
                    onClick={() => {
                      setTab(pageNum);
                    }}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer flex justify-center whitespace-pre text-xs p-4">
          {`Deze data is gebaseerd op informatie van `}
          <a className="underline" href="https://www.joshuaproject.net">
            Joshua Project
          </a>
        </div>
      </>
      {/* )} */}
    </div>
  );
};

export default BiblePoverty;
