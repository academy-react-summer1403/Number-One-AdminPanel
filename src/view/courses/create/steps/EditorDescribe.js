import toast from "react-hot-toast";
import EditorComponent from "../../../../@core/components/editor-js";

const EditorDescribe = ({ stepper, setDesc }) => {
  const handleSave = (data) => {
    console.log("Received data from editor:", data);
    if (data.blocks.length !== 0) {
      setDesc({Describe:data});
      stepper.next();
    }
    else toast.error("لطفا متن پیام را وارد کنید")
  };
  return (
    <div>
      <EditorComponent onSave={handleSave} />
    </div>
  );
};

export default EditorDescribe;
