import React from "react";
import styles from "./index.css";
let grasses = [];
let edge = 0;
let turns = 0;
let stars = [];
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
        class grass {
            constructor(props){
                this.x = Math.random();
                this.w = Math.random();
                this.sin = Math.random()*Math.PI*2;
            }
            render = (ctx,sin) => {
                ctx.save();
                ctx.beginPath();
                let x = parseInt(this.x*_this.state.w);
                let w = parseInt(this.w*(_this.state.h/40));
                let ys = _this.state.h;
                let ye = ys - (w * 20);
                ctx.moveTo(x-w/2,ys);
                let lineGradient = ctx.createLinearGradient(x,ys,x,ye);
                lineGradient.addColorStop(0,"#082307");
                lineGradient.addColorStop(1,"#66A729");
                ctx.fillStyle = lineGradient;
                ctx.quadraticCurveTo(x-w/3,ys - (ys-ye)/2,x+Math.sin(sin+this.sin)*w*5,ye);
                ctx.quadraticCurveTo(x+w/3,ys - (ys-ye)/2,x+w/2,ys);
                ctx.fill();
                ctx.restore();
            }
        }
        class star {
            constructor(props){
                this.x = Math.random();
                this.y = Math.random();
                this.r = Math.random()*1.2;
                this.start =  Math.random();
            }
            render = (ctx) => {
                let cy = 3;//周期
                let date = new Date();
                let ms = date.getMilliseconds() + (date.getSeconds()%cy+1)*1000 + this.start*cy*1000;
                let yu = ms%(cy*1000);
                let r = yu<cy*1000/2 ? 0.5 + yu/(cy*1000/2) : 0.5 + (cy*1000 - yu)/(cy*1000/2);
                ctx.save();
                ctx.beginPath();
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 2;
                ctx.shadowColor = "#f3daa1";
                ctx.fillStyle = "rgba(243, 218, 161, 0.8)";
                ctx.arc(parseInt(this.x*_this.state.w),parseInt(this.y*_this.state.h),this.r*r,0,Math.PI*2,true);
                ctx.fill();
                ctx.restore();
            }
        }
        for(let i=0;i<150;i++){
            grasses.push(new grass());
        }
        for(let i=0;i<100;i++){
            stars.push(new star);
        };
        window.onresize = () => {
            this.setState({
                w:document.body.clientWidth,
                h:document.body.clientHeight
            },()=>{
                this.sky();
            })
        }
        this.stop = requestAnimationFrame(this.init);
        this.sky();
    }
    componentWillUnmount(){
        cancelAnimationFrame(this.stop);
    }
    init = () => {
        let c = this.refs.canvas2.getContext("2d");
        c.clearRect(0,0,this.state.w,this.state.h);
        c.save();
        grasses.map((v,i) => {
            v.render(c,edge);
        })
        stars.map((v,i) => {
            v.render(c);
        })
        c.restore();
        edge+=0.05;
        if(edge>=Math.PI*2){
            edge = 0;
        }
        this.stop = requestAnimationFrame(this.init);
    }
    sky = () => {
        let c = this.refs.canvas1.getContext("2d");
        c.clearRect(0,0,this.state.w,this.state.h);
        let radiaGradient = c.createRadialGradient(this.state.w-200,this.state.h/1.5,0,this.state.w-200,this.state.h/1.5,1200);
        radiaGradient.addColorStop(0,"#132D81");
        radiaGradient.addColorStop(1,"rgba(1,14,22,0.8)");;
        c.fillStyle = radiaGradient;
        c.arc(this.state.w-200,this.state.h/1.5,1200,0,Math.PI*2,true);
        c.fill();
        c.restore(); 
        
        c.save();
        c.beginPath();
        c.fillStyle = "#fff";
        c.arc(this.state.w-200,this.state.h/1.5,40,0,Math.PI*2,true);
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.shadowColor = "#fff";
        c.shadowBlur = 50;
        c.fill();
        c.restore();
    }
    render(){
        return(
			<div className={styles.container}>
                <canvas className={styles.canvas1} ref="canvas1" width={this.state.w} height={this.state.h}></canvas>
                <canvas className={styles.canvas2} ref="canvas2" width={this.state.w} height={this.state.h}></canvas>
			</div>
		)
    }
}
export default Page;