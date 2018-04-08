import React from "react";
import { Link } from "dva/router";
import styles from "./index.css";
let edge = 0;
class Page extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            w:document.body.clientWidth,
            h:document.body.clientHeight
        }
    }
    componentDidMount(){
        let _this = this;
        class wave {
            constructor(props){
                this.or = 1;
                this.edge = 0;
                this.waveLen = 50;
            }
            render = (ctx) => {
                let y = _this.state.h/2;
                ctx.lineWidth = 5;
                ctx.strokeStyle = "#fff";
                ctx.beginPath();
                ctx.moveTo(0,y);
                for(let i=0;i<=this.edge;i+=(Math.PI*2/this.waveLen)){
                    let yAxis = Math.sin(i)*50;
                    ctx.lineTo(i*(this.waveLen/Math.PI*2),y-yAxis);
                }
                ctx.stroke();
            }
        }
        window.onresize = () => {
            this.setState({
                w:document.body.clientWidth,
                h:document.body.clientHeight
            },() => {
                this.stop = requestAnimationFrame(this.init.bind(null,new wave))
            })
        }
        this.stop = requestAnimationFrame(this.init.bind(null,new wave))
    }
    componentWillUnmount(){
        cancelAnimationFrame(this.stop);
    }
    init = (wave) => {
        let c = this.refs.canvas1.getContext("2d");
        c.clearRect(0,0,this.state.w,this.state.h);
        wave.render(c);
        wave.edge+=0.2*wave.or;
        if(wave.edge*(wave.waveLen/Math.PI*2)>=this.state.w || wave.edge*(wave.waveLen/Math.PI*2)<0){
            wave.or = -wave.or;
        }
        this.stop = requestAnimationFrame(this.init.bind(null,wave));
    }
    render(){
        return(
			<div className={styles.container}>
               <canvas className={styles.canvas1} ref="canvas1" width={this.state.w} height={this.state.h}>你的浏览器不支持canvas</canvas>
			</div>
		)
    }
}
export default Page;