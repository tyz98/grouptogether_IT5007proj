import ResponsiveBar from "../ResponsiveBar"
import Container from '@mui/material/Container';
import Head from 'next/head'
import {pages, settings} from "../../constants"
import styles from './navbarlayout.module.css'

export default function NavbarLayout({ children }) {
  return (
    <>
      <Head>
        <title>Group Together</title>
      </Head>
      <ResponsiveBar pages={pages} settings={settings}/>
      <main className={styles.main}>
        <Container maxWidth="xl">{children}</Container>
      </main>
    </>
  )
}
