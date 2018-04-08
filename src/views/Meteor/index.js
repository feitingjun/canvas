import React from "react";
import { connect } from "dva";
import styles from "./index.css";
import mountain from "./mountain1.png";
import tree from "./tree.png";
let turns = 0;
let meteors = [];
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
        class meteor {
            constructor(props){
                this.x = parseInt(Math.random()*_this.state.w);
                this.y = parseInt(Math.random()*_this.state.h);
                this.r = Math.random()*2.5;
                this.len = this.r*20;
                this.xv = parseInt(Math.random()*5)+5;
                this.yv = this.xv;
                this.color = `${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},${Math.round(Math.random()*255)}`
            }
            render = (ctx) => {
                ctx.save();
                let op = 1;
                for(let i=0;i<=this.len;i+=this.r/2){
                    ctx.save();
                    ctx.beginPath();
                    op*=0.9;
                    ctx.fillStyle = `rgba(${this.color},${op})`
                    ctx.arc(this.x-i,this.y-i,this.r,0,Math.PI*2,false);
                    ctx.fill();
                    ctx.restore();
                }
            }
        }
        class star {
            constructor(props){
                this.x = Math.random();
                this.y = Math.random();
                this.r = Math.random()*1.3;
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
        for(let i=0;i<100;i++){
            stars.push(new star);
        };
        window.onresize = () => {
            this.setState({
                w:document.body.clientWidth,
                h:document.body.clientHeight
            },() => {
                this.bg();
            })
        }
        this.bg();
        this.stop = requestAnimationFrame(this.draw.bind(null,meteor));
    }
    componentWillUnmount(){
        cancelAnimationFrame(this.stop);
    }
    bg = () => {
        let _this = this;
        let c = this.refs.canvas1.getContext("2d");
        c.clearRect(0,0,this.state.w,this.state.h);
        c.save();
        let radiaGradient = c.createRadialGradient(this.state.w-500,this.state.h,0,this.state.w-500,this.state.h,1200);
        radiaGradient.addColorStop(0,"#132D81");
        radiaGradient.addColorStop(1,"rgba(1,14,22,0.8)");
        // let linegr = c.createLinearGradient(0,this.state.h,0,0);
        // linegr.addColorStop(0,"#132D81");
        // linegr.addColorStop(1,"rgba(1,14,22,0)");
        c.fillStyle = radiaGradient;
        c.arc(this.state.w-500,this.state.h,1200,0,Math.PI*2,true);
        // c.fillRect(0,0,this.state.w,this.state.h);
        c.fill();
        c.restore();

        c.save();
        c.beginPath();
        c.fillStyle = "#fff";
        c.arc(this.state.w-200,200,40,0,Math.PI*2,true);
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.shadowColor = "#fff";
        c.shadowBlur = 50;
        c.fill();
        c.restore();
    }
    draw = (meteor) => {
        let _this = this;
        let c = this.refs.canvas2.getContext("2d");
        c.clearRect(0,0,this.state.w,this.state.h);
        c.save();
        stars.map((v,i) => {
            v.render(c);
        })
        meteors.map((v,i) => {
            if(v.x-v.len<=this.state.w&&v.y-v.len<=this.state.h){
                v.render(c);
                v.x += v.xv;
                v.y += v.yv;
            }else{
                meteors.splice(i,1);
            }
        })
        c.restore();
        turns++;
        if(turns>17){
            turns = 0;
            let me = new meteor;
            meteors.push(me);
        }
        this.stop = requestAnimationFrame(this.draw.bind(null,meteor));
    }
	render(){
		return(
			<div className={styles.container}>
                <canvas className={styles.canvas1} ref="canvas1" width={this.state.w} height={this.state.h}>您的浏览器不支持canvas</canvas>
                <canvas className={styles.canvas2} ref="canvas2" width={this.state.w} height={this.state.h}>您的浏览器不支持canvas</canvas>
                <img className={styles.mountain} src={mountain} alt=""/>
			</div>
		)
	}
}
export default Page;