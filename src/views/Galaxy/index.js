import React from "react";
import { connect } from "dva";
import styles from "./index.css";
import earth from "./earth.png";
let earthImg = new Image();
earthImg.src = earth;
let edge = 0;
let stars = [];
class Page extends React.Component {
	constructor(props){
		super(props);
		this.state = {
            width:document.body.clientWidth,
            height:document.body.clientHeight
		}
        window.onresize = () => {
            this.setState({
                width:document.body.clientWidth,
                height:document.body.clientHeight
            })
        }
    }
    componentDidMount(){
        for(let i=0;i<50;i++){
            stars.push({
                x:Math.random()*document.body.clientWidth,
                y:Math.random()*document.body.clientHeight,
                r:Math.random()*2,
                t:Math.random()*360
            })
        }
        this.stop = window.requestAnimationFrame(this.init)
        // let c = this.refs.canvas1.getContext("2d");
        // this.galaxy = {
        //     w:document.body.clientWidth,
        //     h:document.body.clientHeight,
        //     draw:()=>{
                
        //     }
        // }
    }

    componentWillUnmount(){
        cancelAnimationFrame(this.stop);
    }
    init = () => {
        let c = this.refs.canvas1.getContext("2d");
        c.clearRect(0,0,this.state.width,this.state.height);

        stars.map((v,i)=>{
            c.save();
            c.beginPath();
            c.fillStyle = "rgba(243, 218, 161, 0.8)";
            let size = v.t+edge;
            size = size%120<60 ? size%120/60 : (120-size%120)/60;
            c.arc(v.x,v.y,v.r*size,0,Math.PI*2,true);
            c.shadowOffsetX = 0;
            c.shadowOffsetY = 0;
            c.shadowBlur = 2;
            c.shadowColor = "#f3daa1";
            c.fill();
            c.restore();
        })
        c.save();
        c.translate(this.state.width/2-200,this.state.height/2-200);

        c.save();
        let radiaGradient = c.createRadialGradient(200,200,0,200,200,30);
        radiaGradient.addColorStop(0,"#f3e9d1");
        radiaGradient.addColorStop(1,"#f3daa1");
        c.fillStyle = radiaGradient;
        // let arc1 = new Path2D();
        c.beginPath();
        c.arc(200,200,30,0,Math.PI*2,true);
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.shadowBlur = 10;
        c.shadowColor = "#f3daa1";
        c.fill();
        c.restore();
        
        c.beginPath();
        c.moveTo(300,200);
        c.arc(200,200,100,0,Math.PI*2,true);
        c.strokeStyle = "#00233D";
        c.stroke();
        
        c.save();
        c.translate(200,200);
        c.rotate(Math.PI/180*edge);
        c.translate(-100,0);
        c.rotate(-Math.PI/180*edge*2);
        c.drawImage(earthImg,-10,-10,20,20);

        c.beginPath();
        c.rotate(Math.PI/180*edge*4);
        c.arc(-20,0,3,0,Math.PI*2,true);
        c.fillStyle = "#fff";
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.shadowBlur = 2;
        c.shadowColor = "#fff";
        c.fill();
        c.restore();
        c.restore();
        edge++;
        if(edge>360){
            edge=0;
        }
        this.stop = requestAnimationFrame(this.init);
    }
	render(){
		return(
			<div className={styles.container}>
                <canvas className={styles.canvas1} ref="canvas1" width={this.state.width} height={this.state.height}></canvas>
			</div>
		)
	}
}
export default Page;