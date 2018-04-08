import React from "react";
import styles from "./index.css";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
class Page extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text:""
        }
    }
    handleChange = html => {
        this.setState({
            text:html
        })
    }
    modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ]
    }
    formats =  [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]
    
    render(){
        return(
			<div className={styles.container}>
               <ReactQuill 
                    value={this.state.text} 
                    modules={this.modules} 
                    formats={this.formats} 
                    onChange={this.handleChange}/>
			</div>
		)
    }
}
export default Page;