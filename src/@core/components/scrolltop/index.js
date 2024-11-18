// ** React Imports  
import { useEffect, useState } from "react";  

// ** Third Party Components  
import PropTypes from "prop-types";  

const ScrollTop = ({   
  showOffset,   
  scrollBehaviour = "smooth", // مقدار پیش‌فرض به اینجا اضافه شده است  
  children,   
  ...rest   
}) => {  
  // ** State  
  const [visible, setVisible] = useState(false);  

  useEffect(() => {  
    const handleScroll = () => {  
      if (window.pageYOffset >= showOffset) {  
        setVisible(true);  
      } else {  
        setVisible(false);  
      }  
    };  
    
    if (window) {  
      window.addEventListener("scroll", handleScroll);  
    }  

    // Cleanup event listener on component unmount  
    return () => {  
      window.removeEventListener("scroll", handleScroll);  
    };  
  }, [showOffset]); // اضافه کردن showOffset به dependency array  

  const handleScrollToTop = () => {  
    window.scroll({ top: 0, behavior: scrollBehaviour });  
  };  

  return (  
    visible && (  
      <div className="scroll-to-top" onClick={handleScrollToTop} {...rest}>  
        {children}  
      </div>  
    )  
  );  
};  

export default ScrollTop;  

// ** PropTypes  
ScrollTop.propTypes = {  
  showOffset: PropTypes.number.isRequired, // اگر showOffset اجباری است، it should be required  
  children: PropTypes.any.isRequired,  
  scrollBehaviour: PropTypes.oneOf(["smooth", "instant", "auto"]),  
};  
