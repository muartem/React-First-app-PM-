import React from 'react';
import styles from './Card.module.css';

export default class Card extends React.Component{
   render(){
       const whether = this.props.whether
       return(
            <div className={styles.card}>
                <div className={styles.front}>
                    <h2>{whether.day}</h2>
                    <div>
                        <div className={styles.icon} style={{
                            backgroundImage: `url(./icons/${whether.img}.svg)`
                        }}/>
                        <p>&#128167; {whether.humidity} %</p>
                        <p>&#9202; {whether.pressure} мм</p>
                    </div>
                    <h2> {whether.temperature.max}°С / <span> {whether.temperature.min}°С</span></h2>
                </div>
                <div className={styles.back}>
                    <h2>{whether.date}</h2>
                    <div className={styles.icon} style={{transform: `rotate(${whether.wind.directionDeg}deg)`}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><g id="Page-1" fill="none" fill-rule="evenodd"><g id="021---Navigation-Symbol" fill="rgb(255,255,255)" fill-rule="nonzero"><path id="Shape" d="m30 0c-16.5685425 0-30 13.4314575-30 30s13.4314575 30 30 30 30-13.4314575 30-30c-.018737-16.5607751-13.4392249-29.98126296-30-30zm0 58c-15.463973 0-28-12.536027-28-28s12.536027-28 28-28 28 12.536027 28 28c-.0173046 15.4567995-12.5432005 27.9826954-28 28z"/><path id="Shape" d="m32.0493 6.3833c-.3380161-.8385464-1.1528428-1.38652007-2.0569471-1.38330371-.9041043.00321635-1.7150116.55697358-2.0470529 1.39790371l-15.7739 40.5215c-.3920024.943655-.0883838 2.0330086.7352096 2.6378595.8235934.6048508 1.953885.5685676 2.7369904-.0878595l14.2285-12.9386c.0317083-.0235424.0687362-.0388963.1078-.0447.0071 0 .013.0041.02.0041.0112 0 .02-.006.0316-.0064.0152798-.0008399.0306011.0005071.0455.004l14.2794 12.9822c.0166.0152.0332.0293.05.043.7908882.6232037 1.9023002.6356124 2.7069054.0302219.8046052-.6053904 1.1005929-1.6767361.7208946-2.6093219zm13.853 41.5684c-.0632853.0602434-.1611608.0650095-.23.0112l-14.3-12.9976c-.1159513-.0906403-.2406711-.1694653-.3723-.2353v-11.73c0-.5522847-.4477153-1-1-1s-1 .4477153-1 1v11.7426c-.1496642.0739034-.2913695.1629342-.4229.2657l-14.229 12.939c-.0683963.0689144-.179221.0708649-.25.0044-.0955717-.064756-.1253456-.1920784-.0684-.2925l14.9703-38.4577v9.7985c0 .5522847.4477153 1 1 1s1-.4477153 1-1v-9.798l14.9761 38.4713c.0507229.0979626.0187893.2184275-.0738.2784z"/></g></g></svg>
                    </div>
                    <p>Ветер:</p>
                    <p> {whether.wind.speed} км/ч</p>
                    <h2> {whether.temperature.max}°С / <span> {whether.temperature.min}°С</span></h2>
                </div>
            </div>
        )
    }
}
