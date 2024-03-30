import React from 'react'
import styles from './Sidebar.module.css'

export default function Footer() {
  return (
    <div className={styles.footer}>
        <p className={styles.copyright}>
            &copy; Copyrights {new Date().getFullYear()} Worldwise Inc
        </p>
    </div>
  )
}
