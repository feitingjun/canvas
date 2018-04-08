import React from "react";
import { Button } from "antd";
import styles from "./index.css";
import E from "wangeditor";
class Page extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editorContent:""
        }
    }
    componentDidMount(){
        const menu = this.refs.menu;
        const dom = this.refs.editor;
        const editor = new E(menu,dom);
        this.editor = editor;
        editor.customConfig.onchange = html => {
            this.setState({
                editorContent:html
            })
        }
        editor.customConfig.uploadImgShowBase64 = true;
        editor.create();
    }
    submit = () => {
        const html = this.editor.txt.html();
        const a = this.state.editorContent;
        debugger
    }
    render(){
        return(
			<div className={styles.container}>
                <Button onClick={this.submit}>上传</Button>
                <div ref="menu"></div>
                <div className={styles.editor} ref="editor"></div>
			</div>
		)
    }
}
export default Page;