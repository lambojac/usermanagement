import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">kenny Growth Community!</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Lagos Nigeria! <br/> kenny Growth provides a trained staff ready to meet your Ads needs.</p>
                <address className="public__addr">
            kenny Growth Community<br />
                    <br />
                    kenny lambo<br/>
                    <a href="tel:+2347035897528">(081)-249-34944</a>
                </address>
                <br />
                <p>Owner: lambo</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public