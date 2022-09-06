import Footer from './Footer';
import classes from './Layout.module.scss';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <>
      <div className={classes.container}>
        <Navbar />
        <h1>This is header</h1>
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
