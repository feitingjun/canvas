import React from "react";
import { Link } from "dva/router";
import styles from "./index.css";

let balls = [];
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
        class ball {
            constructor(props){
                this.x = Math.random();
                this.y = Math.random();
                this.r = parseInt(Math.random()*20) + 10;
                this.color = `rgb(${parseInt(Math.random()*255)},${parseInt(Math.random()*255)},${parseInt(Math.random()*255)})`;
                this.a = 1;
                this.v = 0;
                this.t = new Date().getTime();
            }
            render = (ctx) => {
                let x = parseInt(this.x*_this.state.w);
                let y = parseInt(this.y*(_this.state.h - 100));
                let radiaGradient = ctx.createRadialGradient(x,y,0,x,y,this.r);
                radiaGradient.addColorStop(0,"#fff");
                radiaGradient.addColorStop(1,this.color);
                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = radiaGradient;
                ctx.arc(x,y,this.r,0,Math.PI*2,false);
                ctx.fill();
                ctx.restore();
                this.v = this.v + this.a/_this.state.h;
                this.y = this.y + this.v;
                if(parseInt(this.y*_this.state.h) >= _this.state.h-100){
                    this.y = (_this.state.h-100)/_this.state.h;
                    this.v *= -0.9;
                }
            }
        }
        window.onresize = () => {
            this.setState({
                w:document.body.clientWidth,
                h:document.body.clientHeight
            })
        }
        this.timer = setInterval(() => {
            balls.push(new ball());
        },500)
        this.stop = requestAnimationFrame(this.init);
    }
    componentWillUnmount(){
        cancelAnimationFrame(this.stop);
        clearInterval(this.timer);
    }
    init = () => {
        let c = this.refs.canvas1.getContext("2d");
        c.clearRect(0,0,this.state.w,this.state.h);
        balls.map((v,i) => {
            v.render(c);
            if(new Date().getTime() - v.t > 10000){
                balls.splice(i,1);
            }
        })
        this.stop = requestAnimationFrame(this.init);
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