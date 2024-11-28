import { useEffect, useState } from "react";
import { ArrowLeft, Link } from "react-feather";

const CreateEditorJsBlocks = ({ editorData }) => {
  const [editor, setEditor] = useState();

  useEffect(() => {
    if (editorData.length == 0) return;
    setEditor(JSON.parse(editorData));
  }, [editorData]);

  const loadBlocks = (data) => {
    return data?.blocks?.map((block, index) => {
      switch (block.type) {
        case "paragraph":
          return (
            <p className="fs-5" key={index}>
              {block?.data?.text}
            </p>
          );
        case "header":
          switch (block?.data?.level) {
            case 1:
              return <h1>{block?.data?.text}</h1>;
            case 2:
              return <h2>{block?.data?.text}</h2>;
            case 3:
              return <h3>{block?.data?.text}</h3>;
            case 4:
              return <h4>{block?.data?.text}</h4>;
            case 5:
              return <h5>{block?.data?.text}</h5>;
            case 6:
              return <h6>{block?.data?.text}</h6>;
          }
        case "quote":
          return (
            <div
              className="my-4"
              style={{
                backgroundColor: "#EFEEFE",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingLeft: "32px",
                paddingRight: "32px",
                display: "flex",
                width: "83%",
                justifyContent: "space-between",
                marginLeft: "auto",
                marginRight: "auto",
                borderRight: "5px solid #5751E1",
                color: "#6D6C80",
              }}
            >
              <p className="w-5/6 max-sm:text-sm">{block?.data?.text}</p>
              <Link size={30} />
            </div>
          );
        case "list":
          return (
            <ul className="my-1">
              {block?.data?.items.map((item, index) => (
                <li
                  key={index}
                  className="d-flex align-items-center gap-75 mb-1"
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: "#FFC224",
                      borderRadius: "50%",
                      border: "1px solid #000",
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <ArrowLeft size={16} />
                  </div>
                  <span style={{ color: "#161439" }} className="fs-4">
                    {item.content}
                  </span>
                </li>
              ))}
            </ul>
          );
        default:
          <></>;
      }
    });
  };

  return <div>{editorData && loadBlocks(editor)}</div>;
};

export default CreateEditorJsBlocks;
