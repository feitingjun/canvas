import React from "react";
import { connect } from "dva";
import styles from "./index.css";
import Icon from "./icon.png";
class Page extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			
		}
	}
    componentDidMount(){
        let canvas1 = this.refs.canvas1;
        let c1 = canvas1.getContext("2d");
        c1.beginPath();//生成路径
        //三角形
        c1.moveTo(0,0);//移动笔触，将画笔移动到指定坐标，也就是路径的开始位置。
        c1.lineTo(100,100);
        c1.lineTo(0,100);
        c1.fillStyle="red";
        c1.fill();//填充当前图形，自动闭合
        // c1.closePath()//闭合图形
        // c1.stroke();//绘制路径（线图），不自动闭合
        //圆
        c1.moveTo(200,50);
        c1.arc(150,50,50,0,Math.PI*2,true);
        c1.stroke();
        //二次贝塞尔曲线
        c1.moveTo(20,100);
        c1.quadraticCurveTo(100,150,20,200);//第一，二个参数是第一个控制点，第三、四个参数是结束位置
        c1.stroke();
        //三次贝塞尔曲线
        c1.moveTo(120,100);
        c1.bezierCurveTo(60,140,100,120,200,200);
        c1.stroke();
        //Path2D,可以将多个图形挂载在Path2D对象上一起绘出
        let rect1 = new Path2D();
        c1.moveTo(250,0);
        rect1.rect(250,0,100,100);
        c1.moveTo(350,150);
        let arc1 = new Path2D();
        arc1.arc(300,150,50,0,Math.PI*2,true);
        c1.stroke(rect1);
        c1.fill(arc1);
        //SVG paths Path2D可以使用SVA的路径数据来绘制图形
        let p = new Path2D("M0 210 h 80 v 80 h -80 Z");//M开始位置 h:水平移动 v:垂直移动 z:回到起点
        c1.fill(p);

        const canvas2 = this.refs.canvas2;
        let c2 = canvas2.getContext("2d");
        c2.fillStyle = "#fd0";
        c2.fillRect(0,0,200,200);
        c2.fillStyle = "#0c6";
        c2.fillRect(200,0,200,200);
        c2.fillStyle = "#09f";
        c2.fillRect(0,200,200,200);
        c2.fillStyle = "#f30";
        c2.fillRect(200,200,200,200);
        c2.fillStyle = "#fff";
        c2.globalAlpha = 0.2;
        for(let i=0;i<7;i++){
            c2.beginPath();
            c2.arc(200,200,(i+1)*25,0,Math.PI*2,true);
            c2.fill();
        }

        const canvas3 = this.refs.canvas3;
        let c3 = canvas3.getContext("2d");
        // createLinearGradient(x1, y1, x2, y2)
        //     createLinearGradient 方法接受 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)。
        // createRadialGradient(x1, y1, r1, x2, y2, r2)
        //     createRadialGradient 方法接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，
        // 后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。
        let radiaGradient = c3.createRadialGradient(20,20,20,350,350,50);//径向渐变
        radiaGradient.addColorStop(0,"red");
        radiaGradient.addColorStop(1,"#00f");  
        c3.lineWidth = 6;
        // c3.strokeStyle = radiaGradient;
        c3.lineCap = "round";//线头样式   butt:直角(默认)  round:圆角  square:
        c3.lineJoin = "miter";//线条连接处的样式  round:圆角（圆的半径为线宽）  bevel:直角  miter:线段延伸至相交一点
        c3.save();
        c3.strokeStyle = "#0f0";
        c3.miterLimit = 20;//设置lineJoin值为miter时相交点的最远距离
        c3.shadowOffsetX = 0;//阴影
        c3.shadowOffsetY = 0;
        c3.shadowBlur = 26;
        c3.shadowColor = "#0f0";
        c3.beginPath();
        c3.moveTo(20,20);
        c3.quadraticCurveTo(60,20,130,80);
        c3.bezierCurveTo(20,60,160,300,380,380);
        c3.stroke();
        c3.restore();
        c3.lineWidth = 1;
        let offset = 0;
        const draw = () => {
            c3.clearRect(180,30,170,170);
            c3.setLineDash([4,4]);
            c3.lineDashOffset = -offset;
            c3.strokeRect(190,40,150,150);
        }
        setInterval(()=>{
            offset++;
            if(offset>16){
                offset = 0;
            }
            draw();
        },20)

        //Patterns图案样式，使用图片或者已有canvas对象填充
        let img = new Image();
        img.src = Icon;
        img.onload = () => {
            let ptrn = c3.createPattern(img,"repeat");
            c3.fillStyle = ptrn;
            c3.fillRect(0,200,200,200);
        }

        //阴影
        const canvas4 = this.refs.canvas4;
        let c4 = canvas4.getContext("2d");
        c4.shadowOffsetX = 6;
        c4.shadowOffsetY = 6;
        c4.shadowBlur = 4;
        c4.shadowColor = "#f0fa03";
        c4.font = "40px Times New Roman";
        c4.fillStyle = "#fff";
        // c4.fillText("Hello World",20,60);
        c4.strokeText("Hello World",20,60);

        //drawImage将图像渲染到canvas中  和Patterns不一样，Patterns是将图片填充到某个canvas对象中，drawImage是将图形直接渲染到canvas中
        let img2 = new Image();
        img2.src = Icon;
        img2.onload = () => {
            c4.drawImage(img2,10,10,50,50,50,90,80,80);
            /*
                如果3个参数，第1个为图片源，第2、3个为图片左上角位置
                5个参数，第4、5为图片的宽高
                9个参数，第4、5为图片要裁切的在图片上的位置，5、6为裁切的宽高，6、7为图片左上角位置，8、9为图片宽高
            */
        }

        //状态save(保存)、restore(恢复)和Translating(移动)
        //这个例子 先绘制一个图形，然后保存数据，再将画布向左移200px 然后在同一坐标绘制图形，然后恢复，第二个图形就在 200 200 的位置了
        c4.fillStyle = "#0f0";
        c4.fillRect(0,200,100,100);
        c4.save();
        c4.translate(200,0);
        c4.fillRect(0,200,100,100);
        c4.restore();

        //旋转
        c4.rotate(-Math.PI/6);
    }
	render(){
		return(
			<div className={styles.container}>
				{/* <div className={styles.circleBox}>
                    <div className={styles.circle1}></div>
                    <div className={styles.circle2}></div>
                </div> */}
                <canvas className={styles.canvas1} ref="canvas1" width="400px" height="400px"></canvas>
                <canvas className={styles.canvas1} ref="canvas2" width="400px" height="400px"></canvas>
                <canvas className={styles.canvas1} ref="canvas3" width="400px" height="400px"></canvas>
                <canvas className={styles.canvas1} ref="canvas4" width="400px" height="400px"></canvas>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
    const { num } = state.index;
    return { num }
}
export default connect(mapStateToProps)(Page);