import UniTable from "@components/Common/UniversalTable/UniTable";
import { setPageName, setSelectedItem } from "@store/toolsbar/toolsbarSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { folderDetails } from "@store/folders/foldersActions";

function SearchResults() {
  const dispatch = useDispatch();
  const { searchResult, loading } = useSelector(
    (state) => state.stats
  );
  const { open, components } = useSelector((state) => state.toolsbar);
  const { selectedItem } = components;
  const headers = [
    { id: "_id", label: "ID" },
    { id: "title", label: "الاسم" },
    { id: "description", label: "الوصف" },
    {
      id: "exporter",
      label: "المصدر",
    },
    {
      id: "importer",
      label: "المستورد",
    },
    {
      id: "creator",
      label: "المنشئ",
    },
    {
      id: "date",
      label: "التاريخ",
    },
  ];
  const handleClick = (obj) => {
    dispatch(setSelectedItem({ type: "archive", item: obj }));
  };
  // Fetch Data
  useEffect(() => {
    dispatch(setPageName("home"));
    // dispatch(folderDetails(id));
  }, []);
  return (
    <div className="search-result">
      <UniTable
        headers={headers}
        data={searchResult || []}
        title="الارشيف"
        handleClick={handleClick}
        selectedItem={selectedItem?.item}
        noDataMsg={"لا يوجد بيانات حتي الان"}
      />
    </div>
  );
}

export default SearchResults;
