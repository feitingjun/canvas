import React from "react";
import { Link,Route,Switch } from "dva/router";
import styles from "./index.css";
import Galaxy from "../Galaxy";
import Grass from "../Grass";
import Meteor from "../Meteor";
import Wave from "../Wave";
import Ball from "../Ball";

class Page extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           
        }
    }
    render(){
        return(
			<div className={styles.container}>
                <div className={styles.nav}>
                    <div className={styles.linkBox}>
                        <Link className={styles.link} to="/home">流星</Link><br/>
                        <Link className={styles.link} to="/home/galaxy">太阳系</Link><br/>
                        <Link className={styles.link} to="/home/grass">草</Link><br/>
                        <Link className={styles.link} to="/home/wave">波</Link><br/>
                        <Link className={styles.link} to="/home/ball">球</Link>
                    </div>
                </div>
               <div className={styles.content}>
                    <Route exact path="/home" component={Meteor} />
                    <Route path="/home/galaxy" component={Galaxy} />
                    <Route path="/home/grass" component={Grass} />
                    <Route path="/home/wave" component={Wave} />
                    <Route path="/home/ball" component={Ball} />
               </div>
			</div>
		)
    }
}
export default Page;