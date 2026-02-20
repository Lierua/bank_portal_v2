"use client";
type Props = {
  requestPara: string;
  setRequestPara: React.Dispatch<React.SetStateAction<string>>;
};

const RequestStatusFilter = ({ requestPara, setRequestPara }: Props) => {
  return (
    <div className="flex gap-10 items-end pl-10 border-(--black)/10 border-b-2 [&>*]:text-[16px]! [&>*]:font-semibold!">
      <h3
        onClick={() => setRequestPara("Alle")}
        className={`transition-all duration-200 ease-in mb-[-2px] pb-1
              hover:text-(--black)/80
                border-b-2 ${requestPara == "Alle" ? "border-(--black)" : "border-(--black)/0"} 
                ${requestPara == "Alle" ? "text-(--black)/100" : "text-(--black)/50"}`}
      >
        Alle 101
      </h3>
      <h3
        onClick={() => setRequestPara("Pending")}
        className={`transition-all duration-200 ease-in mb-[-2px] pb-1
              hover:text-(--black)/80
                border-b-2 ${requestPara == "Pending" ? "border-(--black)" : "border-(--black)/0"} 
                ${requestPara == "Pending" ? "text-(--black)/100" : "text-(--black)/50"}`}
      >
        Pending 101
      </h3>
      <h3
        onClick={() => setRequestPara("Godkendt")}
        className={`transition-all duration-200 ease-in mb-[-2px] pb-1
              hover:text-(--black)/80
                border-b-2 ${requestPara == "Godkendt" ? "border-(--black)" : "border-(--black)/0"} 
                ${requestPara == "Godkendt" ? "text-(--black)/100" : "text-(--black)/50"}`}
      >
        Godkendt 101
      </h3>
      <h3
        onClick={() => setRequestPara("Afslået")}
        className={`transition-all duration-200 ease-in mb-[-2px] pb-1
              hover:text-(--black)/80
                border-b-2 ${requestPara == "Afslået" ? "border-(--black)" : "border-(--black)/0"} 
                ${requestPara == "Afslået" ? "text-(--black)/100" : "text-(--black)/50"}`}
      >
        Afslået 101
      </h3>
    </div>
  );
};

export default RequestStatusFilter;
