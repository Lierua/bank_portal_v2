import NewAffiliation from "./NewAffiliation";

const AffiliationComponent = () => {
  return (
    <div className="grid pt-[25]">
      <div
        className="grid 
        grid-cols-[minmax(0,220px)_minmax(0,175px)_minmax(0,175px)_minmax(0,175px)_minmax(0,175px)_1fr_minmax(0,110px)]
        border-(--black)/10 border-b-2 pl-10 h-[40] text-(--black)/60"
      >
        <h3>Affiliate</h3>
        <h3>Område</h3>
        <h3>Antal Behandler</h3>
        <h3></h3>
        <h3></h3>
        <p></p>
        <h3 className="text-center"></h3>
      </div>
      <div className="flex flex-col col-span-full overflow-y-auto my-container">
        <NewAffiliation />
      </div>
    </div>
  );
};

export default AffiliationComponent;
