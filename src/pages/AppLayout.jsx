import React from 'react'
import styles from './AppLayout.module.css'
import {Sidebar, Map, User} from '../components'


export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar/>
      <Map/>
      <User/>
    </div>
  )
}
