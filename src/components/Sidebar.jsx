import {AppNav, Logo, Footer} from '../components'
import styles from './Sidebar.module.css'
import { Outlet } from "react-router-dom"

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
        <Logo/>
        <AppNav/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
