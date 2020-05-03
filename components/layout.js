import Head from 'next/head'
import Link from 'next/link'
export default ({ children }) => {
  /*
   * Added this to toggle the is-active class. See:
   * 
   * https://bulma.io/documentation/components/navbar/#navbar-menu
   * https://github.com/jgthms/bulma/issues/856
   */
  const toggleStyles = (event) => {
    document.querySelector('#burger').classList.toggle('is-active')
    document.querySelector('#navbarmenu').classList.toggle('is-active')
  }

  return (
    <>
      <Head>
        <title>ROCKETS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </>
  )
}

