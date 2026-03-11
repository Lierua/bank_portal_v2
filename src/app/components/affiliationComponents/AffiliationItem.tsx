type Props = {
  name: string;
  region: string;
  members: number;
};

const AffiliationItem = ({ name, region, members }: Props) => {
  return (
    <div
      className="grid 
        grid-cols-[minmax(0,220px)_minmax(0,175px)_minmax(0,140px)_minmax(0,175px)]
        border-(--black)/10 border-b-2 pl-10 h-[40]  items-center gap-2
        hover:border-blue-100 hover:bg-blue-100 transition-all duration-200 ease-in cursor-pointer"
    >
      <p className="font-bold truncate text-(--black)/80!"> {name} </p>
      <p className="font-semibold truncate text-(--black)/80!">{region}</p>
      <p className="font-semibold truncate text-center text-(--black)/80!">
        {members}
      </p>
    </div>
  );
};

export default AffiliationItem;
