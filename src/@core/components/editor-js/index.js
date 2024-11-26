import React, { useEffect, useRef } from 'react';  
import EditorJS from '@editorjs/editorjs';  
import Header from '@editorjs/header';  
import Paragraph from '@editorjs/paragraph';  
import List from '@editorjs/list';  
import Quote from "@editorjs/quote";

const EditorComponent = ({ onSave }) => {  
  const editorRef = useRef(null);  
  const editorInstance = useRef(null);  

  useEffect(() => {  
    editorInstance.current = new EditorJS({  
      holder: editorRef.current,  
      tools: {  
        header: Header,  
        paragraph: Paragraph,  
        list: List,  
        quote: Quote,
      },  
      onChange: () => {  
        console.log('Content changed!');  
      },  
    });  

    return () => {  
      editorInstance.current.destroy();  
    };  
  }, []);  

  const saveContent = () => {  
    editorInstance.current  
      .save()  
      .then((outputData) => {  
        console.log('Data saved: ', outputData);  
        if (onSave) {  
          onSave(outputData);
        }  
      })  
      .catch((error) => {  
        console.log('Saving failed: ', error);  
      });  
  };  

  return (  
    <div>  
        <span>متن دوره راوارد کنید</span>
      <div ref={editorRef} style={{ border: '1px solid #ccc', minHeight: '400px',marginTop:"10px" }}></div>  
      <button onClick={saveContent} className="btn btn-primary mx-auto mt-1">ثبت متن</button>  
    </div>
  );  
};  

export default EditorComponent;  