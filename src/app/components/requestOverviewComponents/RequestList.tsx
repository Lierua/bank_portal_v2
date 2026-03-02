import RequestItem from "./RequestItem";
import type { Request } from "../RequestContent";

type Props = {
  search: string;
  requests: Request[];
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
};

const RequestList = ({
  search,
  requests,
  setSelectedId,
  selectedId,
}: Props) => {
  const statusStyles: Record<Request["status"], { text: string; dot: string }> =
    {
      Godkendt: { text: "text-green-500!", dot: "bg-green-400" },
      Afslået: { text: "text-red-500!", dot: "bg-red-400" },
      Ubehandlet: { text: "text-blue-500!", dot: "bg-blue-400" },
    };

  const filteredRequests = requests.filter((request) => {
    const query = search.toLowerCase();
    return Object.values(request).some((value) =>
      value.toString().toLowerCase().includes(query),
    );
  });

  return (
    <div className="grid pt-[25] grid-rows-[40px_1fr]">
      <div
        className="col-span-full grid 
      grid-cols-[minmax(0,220px)_minmax(0,175px)_minmax(0,175px)_minmax(0,175px)_minmax(0,175px)_1fr_minmax(0,110px)]
      border-(--black)/10 border-b-2 pl-10 h-[40] text-(--black)/60"
      >
        <h3>Emne</h3>
        <h3>Lånebeløb</h3>
        <h3>Formål</h3>
        <h3>Status</h3>
        <h3>Behandles af</h3>
        <p></p>
        <h3 className="text-center">Liggetid</h3>
      </div>

      <div className="flex flex-col col-span-full overflow-y-auto h-[calc(100dvh-355px)]">
        {filteredRequests.map((request, index) => {
          const styles = statusStyles[request.status];

          return (
            <RequestItem
              key={request.id}
              request={request}
              styles={styles}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RequestList;
