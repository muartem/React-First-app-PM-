import styles from './Cards.module.css';
import Card from "../Card/Card";
import WHETHER from "../Whether";
import React from "react";


function Cards() {
  return (
    <div className={styles.cards}>
        {WHETHER.map((w) =>
            <Card key={w.date} whether={w}/>
        )}
    </div>
  )
}

export default Cards
