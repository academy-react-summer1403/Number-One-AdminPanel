// const axios = require('axios');  
// const { default: axios } = require('axios');
import axios from 'axios';
import  fs from  'fs'  
// const freader = new FileReader();
// import FileSaver from 'file-saver';

// کلید API خود را در اینجا قرار دهید  
// const apiKey = 'sk-MYAPIKEY';  
// const url = 'https://api.stability.ai/v2beta/stable-image/generate/core';  

// متن ورودی که می‌خواهید تصویر از آن تولید شود  
// const prompt = "Lighthouse on a cliff overlooking the ocean";  

const GenerateImage = async (value) => {  
    // alert(value)
    try {  
        const response = await axios.post('https://api.stability.ai/v2beta/stable-image/generate/core', {  
            prompt: value,  
            output_format: 'jpeg' // فرمت خروجی تصویر  
        }, {  
            headers: {  
                'Authorization': `Bearer ${'sk-g11FZCK7SIZdBSDzgpQ2cxodQoaJshrMyapDKUig0qYb4jae'}`,  
                'Accept': 'image/*',  
                'Content-Type': 'multipart/form-data'  
            },  
            responseType: 'arraybuffer' // برای دریافت تصویر به عنوان بایت  
        });  

        // ذخیره تصویر تولید شده  
        // fs.writeFileSync('output_image.jpeg', response.data);  
        // if(response.success) console.log(response)
        console.log(response)
        
        console.log('تصویر با موفقیت تولید و ذخیره شد.');  
    } catch (error) {  
        // console.error(`خطا در تولید تصویر: ${error.response.status} - ${error.response.data}`);  
    }  
}  

export default GenerateImage

// generateImage();  
